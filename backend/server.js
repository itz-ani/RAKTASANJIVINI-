 require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');
const fs = require('fs');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ Middleware ------------------ //
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ------------------ Multer setup ------------------ //
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ------------------ MySQL connection ------------------ //
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ------------------ Nodemailer setup ------------------ //
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify((error, success) => {
  if (error) console.error("Email server error:", error);
  else console.log("Email server ready");
});

// ------------------ Combined Blood Shortage Email ------------------ //
const sendShortageEmail = async () => {
  try {
    // 1. Get all blood types with shortage
    const [shortages] = await pool.query(`
      SELECT b.blood_type, b.quantity, bb.organization_name
      FROM blood_stock b
      JOIN bloodbanks bb ON b.bloodbank_id = bb.bloodbank_id
      WHERE b.quantity < 5
    `);

    if (shortages.length === 0) {
      console.log("All blood stocks are sufficient.");
      return;
    }

    // 2. For each shortage, find donors with matching blood type
    for (const item of shortages) {
      const [donors] = await pool.query(
        `SELECT name, email FROM donors WHERE blood_type = ?`,
        [item.blood_type]
      );

      if (donors.length === 0) {
        console.log(`No donors found for blood type ${item.blood_type}`);
        continue;
      }

      // 3. Build email text
      const emailText = `
⚠️ Blood Shortage Alert!

 

Dear donor, your blood type is in shortage. Please consider donating to save lives!
      `;

      // 4. Send email to each matching donor
      donors.forEach(donor => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: donor.email,
          subject: `⚠️ Blood Shortage Alert: ${item.blood_type}`,
          text: emailText
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error(`Email to ${donor.email} failed:`, err.message);
          else console.log(`Email sent to ${donor.email}:`, info.response);
        });
      });
    }

  } catch (err) {
    console.error("Error sending shortage emails to donors:", err);
  }
};

// ------------------ Manual API for testing ------------------ //
app.get("/check-stock", async (req, res) => {
  await sendShortageEmail();
  res.send("Stock checked. Shortage email sent if any.");
});

// ------------------ Registration API ------------------ //
app.post('/api/register', upload.single('image'), async (req, res) => {
  try {
    const { userType, fullName, email, password, phone, bloodType, address, dateOfBirth, organizationName, licenseNumber } = req.body;
    let sql, values;

    if (userType === 'patient') {
      sql = `INSERT INTO patients (name, email, phone, password, blood_type, address, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      values = [fullName, email, phone, password, bloodType, address, req.file ? req.file.filename : null];
    } else if (userType === 'donor') {
      sql = `INSERT INTO donors (name, email, phone, password, blood_type, address, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      values = [fullName, email, phone, password, bloodType, address, dateOfBirth];
    } else if (userType === 'bloodbank') {
      sql = `INSERT INTO bloodbanks (organization_name, email, license_number, phone, address) VALUES (?, ?, ?, ?, ?)`;
      values = [organizationName, email, licenseNumber, phone, address];
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const [result] = await pool.query(sql, values);
    res.status(201).json({ message: `${userType} registered successfully`, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------ Login API ------------------ //
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    let sql;
    if (userType === 'patient') sql = `SELECT * FROM patients WHERE email=? AND password=?`;
    else if (userType === 'donor') sql = `SELECT * FROM donors WHERE email=? AND password=?`;
    else if (userType === 'bloodbank') sql = `SELECT * FROM bloodbanks WHERE email=? AND password=?`;
    else return res.status(400).json({ message: 'Invalid user type' });

    const [rows] = await pool.query(sql, [email, password]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------ Cron job: automatic every hour ------------------ //
cron.schedule("0 * * * *", async () => {
  console.log("Scheduled blood stock check running...");
  await sendShortageEmail();
});

// ------------------ Start server ------------------ //
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Optional: send shortage email immediately at startup
  sendShortageEmail();
});

 // ------------------ Get blood shortages for frontend ------------------ //
 app.get("/api/notifications", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.blood_type, b.quantity, bb.organization_name
      FROM blood_stock b
      JOIN bloodbanks bb ON b.bloodbank_id = bb.bloodbank_id
      WHERE b.quantity < 4
    `);

    if (rows.length === 0) {
      return res.json({ message: "No blood shortage currently." });
    }

    // Send the blood shortages to frontend
    res.json(rows);
  } catch (err) {
    console.error("Notifications API error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
 // Get all hospitals with blood unit availability (0 if none)
app.get('/api/hospitals', async (req, res) => {
  const sql = `
    SELECT h.name, h.latitude, h.longitude, h.link,
           IFNULL(b.units_available, 0) AS units_available
    FROM hospitals h
    LEFT JOIN blood_units b ON h.name = b.hospital_name
  `;
  try {
    const [results] = await pool.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Failed to fetch hospitals with blood units:', err);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

// Add a new hospital
app.post('/api/hospitals', async (req, res) => {
  const { name, latitude, longitude, link } = req.body;
  if (!name || !latitude || !longitude || !link) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO hospitals (name, latitude, longitude, link) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await pool.query(sql, [name, latitude, longitude, link]);
    res.status(201).json({ message: 'Hospital added', id: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});


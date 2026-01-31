# Rakta Sanjivini - Blood Bank Management System

A modern, comprehensive blood bank management system built with React, TypeScript, and Tailwind CSS. This application provides real-time blood inventory tracking, role-based access control, and responsive design across all devices.

## 🩸 Features

- **Real-time Blood Inventory Tracking**: Live updates of blood stock levels
- **Role-Based Access Control**: Separate dashboards for patients, donors, and blood banks
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Comprehensive Forms**: Secure registration and authentication for different user types
- **Dashboard Analytics**: Visual charts and statistics for blood bank management
- **Emergency Contact**: 24/7 hotline and support system

## 🚀 Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **Animations**: Motion (Framer Motion)

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rakta-sanjivini.git
   cd rakta-sanjivini
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
rakta-sanjivini/
├── App.tsx                  # Main application component
├── components/
│   ├── ui/                  # Shadcn/ui components (35+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   ├── AboutSection.tsx
│   ├── AuthForms.tsx
│   ├── Dashboard.tsx
│   ├── FeaturesSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   └── Navigation.tsx
├── styles/
│   └── globals.css          # Tailwind CSS v4.0 configuration
├── guidelines/
│   └── Guidelines.md        # Development guidelines
├── public/                  # Static assets
├── package.json
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## 🎯 User Roles

### 1. Patients
- View blood availability
- Request blood donations
- Track donation history
- Emergency blood requests

### 2. Donors
- Register as a donor
- Schedule donation appointments
- View donation history
- Receive donation reminders

### 3. Blood Banks
- Manage blood inventory
- Track donor information
- Generate reports
- Handle emergency requests

## 🔧 Configuration

### Development

The application uses mock data for development. To integrate with a real backend:

1. Update API endpoints in the respective components
2. Configure authentication services
3. Set up environment variables for API keys

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Rakta Sanjivini
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎨 Color Scheme

The application uses a modern color palette:
- **Primary**: Deep blue (#030213)
- **Secondary**: Light gray (#ececf0)
- **Accent**: Red for blood-related elements
- **Background**: White/Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and queries:
- **Emergency Hotline**: +91 98765 43211 (24/7)
- **General Support**: +91 98765 43210 (Mon-Fri 9AM-6PM)
- **Email**: support@raktasanjivini.com

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for efficient blood bank management
- Designed to save lives through technology

---

**Rakta Sanjivini** - *Saving lives, one drop at a time* 🩸
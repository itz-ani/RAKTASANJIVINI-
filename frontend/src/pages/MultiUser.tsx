 import React, { createContext, useContext, useEffect, useState } from 'react';

// -------------------------
// Types
// -------------------------
type Role = 'admin' | 'donor'  | 'org' | 'guest';

interface User {
  id: string;
  name: string;
  role: Role;
  avatarUrl?: string;
}

// -------------------------
// Role context
// -------------------------
const RoleContext = createContext<{ user: User | null; setUser: (u: User | null) => void }>({ user: null, setUser: () => {} });
export const useRole = () => useContext(RoleContext);

// -------------------------
// Mock auth
// -------------------------
function useFakeAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const t = setTimeout(() =>
      setUser({ id: 'u1', name: '', role: 'donor', avatarUrl: undefined }), 250
    );
    return () => clearTimeout(t);
  }, []);
  return { user, setUser };
}

// -------------------------
// Mock Inventory & Appointments
// -------------------------
function useInventory(hospitalId?: string) {
  const [inventory, setInventory] = useState([
    { bloodGroup: 'A+', whole: 12, rbc: 5, plasma: 3 },
    { bloodGroup: 'O+', whole: 9, rbc: 4, plasma: 2 },
    { bloodGroup: 'B+', whole: 7, rbc: 3, plasma: 1 },
    { bloodGroup: 'AB+', whole: 5, rbc: 2, plasma: 1 },
    { bloodGroup: 'A-', whole: 4, rbc: 1, plasma: 1 },
  ]);
  return { inventory, setInventory };
}

function useAppointments(donorId?: string) {
  const [appointments, setAppointments] = useState([
    { id: 'a1', hospital: 'City Blood Bank', time: '2025-11-20 10:00', status: 'confirmed' },
    { id: 'a2', hospital: 'PMC Hospital', time: '2025-12-02 15:00', status: 'pending' },
    { id: 'a3', hospital: 'Red Cross Center', time: '2025-12-15 09:00', status: 'confirmed' },
  ]);
  return { appointments, setAppointments };
}

// -------------------------
// Shared UI
// -------------------------
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/80 dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div className="text-center p-8 text-gray-500">{message}</div>
  );
}

// -------------------------
// Admin Dashboard
// -------------------------
export function AdminDashboard() {
  const stats = { donors: 1200, hospitals: 42, requestsOpen: 3 };
  const pendingVerifications = [
    { name: "Karvenagar Blood Center", note: "Documents awaiting review" },
    { name: "Hadapsar Hospital", note: "New hospital registration" },
    { name: "PMC Blood Bank", note: "Verification pending" },
  ];
  const recentActivity = [
    "User 'John Doe' registered as donor",
    "Blood request for O+ approved",
    "New campaign created by Red Cross",
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="System Overview">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{stats.donors}</div>
            <div className="text-sm text-gray-500">Donors</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.hospitals}</div>
            <div className="text-sm text-gray-500">Hospitals</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.requestsOpen}</div>
            <div className="text-sm text-gray-500">Open Requests</div>
          </div>
        </div>
      </Card>

      <Card title="Pending Verifications">
        <ul className="space-y-2">
          {pendingVerifications.map((v, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-gray-500">{v.note}</div>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Review</button>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recent Activity">
        <ul className="space-y-1 text-sm text-gray-600">
          {recentActivity.map((r, idx) => <li key={idx}>• {r}</li>)}
        </ul>
      </Card>
    </div>
  );
}

// -------------------------
// Donor Dashboard
// -------------------------
export function DonorDashboard() {
  const { user } = useRole();
  const { appointments } = useAppointments(user?.id);

  const nearbyCampaigns = [
    { id: 'c1', title: 'City College Donation Drive', date: '2025-12-05', location: 'Dhole Patil College' },
    { id: 'c2', title: 'PMC Hospital Blood Camp', date: '2025-12-12', location: 'PMC Blood Bank' },
    { id: 'c3', title: 'Red Cross Winter Drive', date: '2025-12-20', location: 'Shivajinagar' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Welcome back, {user?.name ?? 'Donor'}</h2>
        <div className="text-sm text-gray-500">Next eligible: <strong>2026-01-15</strong></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Upcoming Appointments">
          {appointments.length ? (
            <ul className="space-y-3">
              {appointments.map(a => (
                <li key={a.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{a.hospital}</div>
                    <div className="text-xs text-gray-500">{a.time}</div>
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-lg ${a.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {a.status}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty message="No upcoming appointments" />
          )}
        </Card>

        <Card title="Find Nearby Campaigns">
          <ul className="space-y-2">
            {nearbyCampaigns.map(c => (
              <li key={c.id} className="text-sm text-gray-600">
                <strong>{c.title}</strong> — {c.date}, {c.location}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

// -------------------------
// Hospital Dashboard
// -------------------------
export function HospitalDashboard({ hospitalId }: { hospitalId?: string }) {
  const { inventory, setInventory } = useInventory(hospitalId);

  function updateUnits(index: number, field: string, value: number) {
    setInventory(prev => {
      const next = [...prev];
      // @ts-ignore
      next[index][field] = value;
      return next;
    });
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
      <div className="grid gap-4">
        {inventory.map((row: any, idx: number) => (
          <div key={row.bloodGroup} className="flex items-center justify-between bg-white/80 p-3 rounded-lg border">
            <div>
              <div className="font-medium">{row.bloodGroup}</div>
              <div className="text-xs text-gray-500">components: whole / rbc / plasma</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={row.whole} onChange={e => updateUnits(idx, 'whole', Number(e.target.value))} className="w-20 p-1 rounded border" />
              <input type="number" value={row.rbc} onChange={e => updateUnits(idx, 'rbc', Number(e.target.value))} className="w-20 p-1 rounded border" />
              <input type="number" value={row.plasma} onChange={e => updateUnits(idx, 'plasma', Number(e.target.value))} className="w-20 p-1 rounded border" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save inventory</button>
      </div>
    </div>
  );
}

// -------------------------
// Organization Dashboard
// -------------------------
export function OrgDashboard() {
  const [campaigns] = useState([
    { id: 'c1', title: 'College Donation Drive', date: '2025-12-05', location: 'Dhole Patil College' },
    { id: 'c2', title: 'City Blood Camp', date: '2025-12-10', location: 'Hadapsar' },
    { id: 'c3', title: 'Winter Donation Drive', date: '2025-12-20', location: 'Shivajinagar' },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
      <div className="grid gap-4">
        {campaigns.map(c => (
          <div key={c.id} className="flex items-center justify-between bg-white/80 p-3 rounded-lg border">
            <div>
              <div className="font-medium">{c.title}</div>
              <div className="text-xs text-gray-500">{c.date} — {c.location}</div>
            </div>
            <button className="px-3 py-1 rounded border">Manage</button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Create Campaign</button>
      </div>
    </div>
  );
}

// -------------------------
// Role-aware Layout
// -------------------------
export default function RoleAwareLayout() {
  const auth = useFakeAuth();

  return (
    <RoleContext.Provider value={{ user: auth.user, setUser: auth.setUser }}>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">RS</div>
            <div>
              <div className="font-semibold">Rakta Sanjivini</div>
              <div className="text-xs text-gray-500">Multi-role dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Preview mode</span>
            <RoleSwitcher />
          </div>
        </header>

        <main className="bg-transparent">
          {!auth.user ? (
            <div className="p-8 bg-white/60 rounded-lg shadow-sm">Loading user...</div>
          ) : (
            <div>
              {auth.user.role === 'admin' && <AdminDashboard />}
              {auth.user.role === 'donor' && <DonorDashboard />}
              {auth.user.role === 'hospital' && <HospitalDashboard hospitalId={auth.user.id} />}
              {auth.user.role === 'org' && <OrgDashboard />}
            </div>
          )}
        </main>
      </div>
    </RoleContext.Provider>
  );
}

// -------------------------
// Role Switcher
// -------------------------
function RoleSwitcher() {
  const { user, setUser } = useRole();
  const roles: Role[] = ['admin', 'donor', 'hospital', 'org'];

  if (!user) return null;

  return (
    <select value={user.role} onChange={e => setUser({ ...user, role: e.target.value as Role })} className="p-2 border rounded">
      {roles.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}

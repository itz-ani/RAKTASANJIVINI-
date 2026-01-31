 import React, { useEffect, useState } from "react";

interface Notification {
  blood_type: string;
  quantity: number;
  organization_name: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications");
        const data = await res.json();

        if (data.message) setMessage(data.message);
        else setNotifications(data);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching notifications.");
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Blood Shortage Alerts</h1>
      {message && <p className="text-lg text-gray-700">{message}</p>}
      <div className="space-y-4 w-full max-w-md">
        {notifications.map((n, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-600"
          >
            <h2 className="text-xl font-semibold">
              {n.blood_type} shortage
            </h2>
            <p className="text-gray-700">
              Only {n.quantity} units left at {n.organization_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

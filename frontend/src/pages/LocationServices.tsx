 import React, { useState, useEffect } from "react";

// Define types
interface Hospital {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  link: string;
  units_available?: number;
}

// Haversine formula for distance (in km)
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const LocationServices: React.FC = () => {
  const [userLoc, setUserLoc] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearby, setNearby] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/hospitals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hospitals");
        return res.json();
      })
      .then((data: Hospital[]) => setHospitals(data))
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setFetchError("Could not load hospital data.");
      });
  }, []);

  const findNearby = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLoc({ latitude, longitude });

          const found = hospitals
            .map((h) => ({
              ...h,
              distance: haversine(latitude, longitude, h.latitude, h.longitude),
            }))
            .filter((h) => h.distance <= 15)
            .sort((a, b) => {
              if ((b.units_available || 0) === (a.units_available || 0)) {
                return a.distance - b.distance;
              }
              return (b.units_available || 0) - (a.units_available || 0);
            });

          setNearby(found);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          switch (err.code) {
            case err.PERMISSION_DENIED:
              alert("Permission denied. Please allow location access to use this feature.");
              break;
            case err.POSITION_UNAVAILABLE:
              alert("Position unavailable. Please try again later.");
              break;
            case err.TIMEOUT:
              alert("Location request timed out. Please try again.");
              break;
            default:
              alert("An unknown error occurred: " + err.message);
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLoading(false);
      alert("Geolocation not supported by your browser.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md font-sans">
      <h1 className="text-4xl font-bold text-black-600 mb-4 text-center">
        Location Services
      </h1>
      <p className="text-gray-700 text-lg mb-6 text-center">
        Find nearby blood banks, camps, and donors.
      </p>

      {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}

      <div className="text-center mb-6">
        <button 
          onClick={findNearby}
          disabled={loading || hospitals.length === 0}
          className={`px-4 py-2 rounded ${
            loading || hospitals.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 cursor-pointer"
  
          } text-black font-semibold`}
        >
          {loading ? "Locating..." : "Find My Nearby Hospitals"}
        </button>
      </div>

      {userLoc && (
        <p className="text-center mb-4">
          Your location: {userLoc.latitude.toFixed(4)}, {userLoc.longitude.toFixed(4)}
        </p>
      )}

      {nearby.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {nearby.map((h) => (
            <a
              key={h.id}
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-300 rounded p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">{h.name}</h3>
              <p className="text-gray-600">{h.distance?.toFixed(2)} km away</p>
              <p className="text-teal-600 mt-1 text-sm">
                {h.units_available && h.units_available > 0
                  ? `Units Available: ${h.units_available}`
                  : "No units available"}
              </p>
              <p className="text-teal-600 mt-1 text-sm underline">Visit Map</p>
            </a>
          ))}
        </div>
      ) : (
        userLoc &&
        !loading &&
        hospitals.length > 0 && (
          <p className="text-center text-gray-600">No hospitals found within 15km of your location.</p>
        )
      )}
    </div>
  );
};

export default LocationServices;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Heart, 
  Users, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

interface DashboardProps {
  userType: string;
}

// Mock data for blood inventory
const bloodTypes = [
  { type: 'A+', available: 45, required: 50, status: 'good' },
  { type: 'A-', available: 12, required: 20, status: 'low' },
  { type: 'B+', available: 38, required: 40, status: 'good' },
  { type: 'B-', available: 8, required: 15, status: 'critical' },
  { type: 'AB+', available: 22, required: 25, status: 'good' },
  { type: 'AB-', available: 5, required: 10, status: 'low' },
  { type: 'O+', available: 67, required: 70, status: 'good' },
  { type: 'O-', available: 15, required: 30, status: 'low' }
];

const recentDonations = [
  { id: 1, donor: 'John Smith', type: 'O+', date: '2024-09-23', location: 'City Hospital' },
  { id: 2, donor: 'Sarah Johnson', type: 'A-', date: '2024-09-23', location: 'Medical Center' },
  { id: 3, donor: 'Mike Wilson', type: 'B+', date: '2024-09-22', location: 'Community Center' },
  { id: 4, donor: 'Emily Davis', type: 'AB+', date: '2024-09-22', location: 'City Hospital' }
];

const urgentRequests = [
  { id: 1, patient: 'Emergency Case #1234', type: 'O-', units: 3, hospital: 'Metro Hospital', time: '2 hours ago' },
  { id: 2, patient: 'Emergency Case #1235', type: 'A-', units: 2, hospital: 'City Medical', time: '4 hours ago' },
  { id: 3, patient: 'Emergency Case #1236', type: 'B-', units: 1, hospital: 'General Hospital', time: '6 hours ago' }
];

export function Dashboard({ userType }: DashboardProps) {
  const [bloodInventory, setBloodInventory] = useState(bloodTypes);
  const [totalDonors, setTotalDonors] = useState(542);
  const [totalDonations, setTotalDonations] = useState(1247);
  const [livesImpacted, setLivesImpacted] = useState(3741);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update inventory
      setBloodInventory(prev => prev.map(blood => ({
        ...blood,
        available: Math.max(0, blood.available + Math.floor(Math.random() * 3) - 1)
      })));

      // Incrementally update stats
      if (Math.random() > 0.7) {
        setTotalDonors(prev => prev + 1);
        setTotalDonations(prev => prev + 1);
        setLivesImpacted(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return '';
      case 'low': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'donor' ? 'Donor Dashboard' : 
             userType === 'patient' ? 'Patient Dashboard' : 
             'Blood Bank Dashboard'}
          </h1>
          <p className="text-gray-600">
            Real-time blood inventory and management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Donors</p>
                  <p className="text-3xl font-bold">{totalDonors.toLocaleString()}</p>
                  <p className="text-red-100 text-xs mt-1">↑ 12% from last month</p>
                </div>
                <Users className="h-12 w-12 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Donations</p>
                  <p className="text-3xl font-bold">{totalDonations.toLocaleString()}</p>
                  <p className="text-blue-100 text-xs mt-1">↑ 8% from last month</p>
                </div>
                <Droplets className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Lives Impacted</p>
                  <p className="text-3xl font-bold">{livesImpacted.toLocaleString()}</p>
                  <p className="text-green-100 text-xs mt-1">↑ 15% from last month</p>
                </div>
                <Heart className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Success Rate</p>
                  <p className="text-3xl font-bold">96.8%</p>
                  <p className="text-purple-100 text-xs mt-1">↑ 2% from last month</p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blood Inventory */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-red-600" />
                  <span>Real-time Blood Inventory</span>
                  <Badge variant="outline" className="ml-auto">Live Updates</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodInventory.map((blood) => (
                    <div key={blood.type} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg">{blood.type}</span>
                        <Badge className={getStatusColor(blood.status)}>
                          {blood.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span className="font-medium">{blood.available} units</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Required:</span>
                          <span className="font-medium">{blood.required} units</span>
                        </div>
                        <Progress 
                          value={(blood.available / blood.required) * 100} 
                          className={`h-2 ${getProgressColor(blood.status)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Recent Donations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Heart className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-gray-600">{donation.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{donation.type}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{donation.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Urgent Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Urgent Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {urgentRequests.map((request) => (
                    <div key={request.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-red-600 text-white">{request.type}</Badge>
                        <span className="text-sm text-gray-600">{request.units} units</span>
                      </div>
                      <p className="font-medium text-sm">{request.patient}</p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{request.hospital}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{request.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  Schedule Donation
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Request Blood
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  View Reports
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Contact Support
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
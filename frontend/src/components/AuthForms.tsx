import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Heart, User, Building2, UserPlus, LogIn, Mail, Lock, Phone, MapPin, Calendar } from 'lucide-react';

interface AuthFormsProps {
  isLogin: boolean;
  onLogin: (userType: string) => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

export function AuthForms({ isLogin, onLogin, onSwitchToRegister, onSwitchToLogin }: AuthFormsProps) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    userType: 'donor'
  });

  const [registerForm, setRegisterForm] = useState({
    userType: 'donor',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bloodType: '',
    address: '',
    dateOfBirth: '',
    organizationName: '',
    licenseNumber: '',
    agreeTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
        userType: loginForm.userType,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      alert('Login successful!');
      onLogin(loginForm.userType); // redirect to dashboard
    } else {
      console.error('Login failed:', data.message);
      alert('Login failed: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error during login');
  }
};


 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Prepare form data
    const formData = new FormData();
    formData.append('userType', registerForm.userType); // donor / patient / bloodbank
    formData.append('fullName', registerForm.fullName);
    formData.append('email', registerForm.email);
    formData.append('password', registerForm.password);
    formData.append('phone', registerForm.phone);
    formData.append('bloodType', registerForm.bloodType);
    formData.append('address', registerForm.address);
    formData.append('dateOfBirth', registerForm.dateOfBirth);
    formData.append('organizationName', registerForm.organizationName);
    formData.append('licenseNumber', registerForm.licenseNumber);

    // If you have an image upload input:
    // formData.append('image', registerForm.imageFile);

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registered successfully:', data);
      alert('Registration successful!');
      onLogin(registerForm.userType); // redirect after registration
    } else {
      console.error('Registration failed:', data.message);
      alert('Registration failed: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error during registration');
  }
};


  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-600 rounded-full p-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your Rakta Sanjivini account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="userType">Account Type</Label>
                <Select 
                  value={loginForm.userType} 
                  onValueChange={(value) => setLoginForm(prev => ({ ...prev, userType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Blood Donor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="patient">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>Patient</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bloodbank">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>Blood Bank</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={onSwitchToRegister}
                  className="text-red-600 hover:text-red-500 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join Rakta Sanjivini</h1>
          <p className="text-gray-600 mt-2">Choose your account type and register to save lives</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={registerForm.userType} onValueChange={(value) => setRegisterForm(prev => ({ ...prev, userType: value }))}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="donor" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Donor</span>
                </TabsTrigger>
                <TabsTrigger value="patient" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Patient</span>
                </TabsTrigger>
                <TabsTrigger value="bloodbank" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Blood Bank</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleRegister} className="mt-6 space-y-4">
                <TabsContent value="donor" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select 
                        value={registerForm.bloodType} 
                        onValueChange={(value) => setRegisterForm(prev => ({ ...prev, bloodType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        className="pl-10"
                        value={registerForm.dateOfBirth}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="patient" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          className="pl-10"
                          value={registerForm.dateOfBirth}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bloodbank" className="space-y-4">
                  <div>
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      placeholder="Enter blood bank name"
                      value={registerForm.organizationName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, organizationName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Official Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="official@bloodbank.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        placeholder="BB/2024/001"
                        value={registerForm.licenseNumber}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, licenseNumber: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="Enter complete address"
                      className="pl-10"
                      value={registerForm.address}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create password"
                        className="pl-10"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className="pl-10"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeTerms"
                    checked={registerForm.agreeTerms}
                    onCheckedChange={(checked) => setRegisterForm(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the <a href="#" className="text-red-600 hover:text-red-500">Terms of Service</a> and{' '}
                    <a href="#" className="text-red-600 hover:text-red-500">Privacy Policy</a>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </form>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className="text-red-600 hover:text-red-500 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
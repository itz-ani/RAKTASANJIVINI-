import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu, Heart, User, LogIn, UserPlus } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isLoggedIn: boolean;
  userType: string;
  onLogout: () => void;
}

export function Navigation({ currentView, setCurrentView, isLoggedIn, userType, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-red-600 rounded-full p-2">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Rakta Sanjivini</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors ${
                  currentView === item.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleNavClick('login')}
                  className="flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
                <Button
                  onClick={() => handleNavClick('register')}
                  className="bg-red-600 hover:bg-red-700 flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Access all pages and account features
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-2 px-4 rounded-lg transition-colors ${
                        currentView === item.id
                          ? 'bg-red-100 text-red-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleNavClick('dashboard')}
                          className="w-full justify-start"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          onClick={onLogout}
                          className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleNavClick('login')}
                          className="w-full justify-start"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                        <Button
                          onClick={() => handleNavClick('register')}
                          className="w-full justify-start bg-red-600 hover:bg-red-700"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
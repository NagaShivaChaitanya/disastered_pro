import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import TrustSignals from './components/TrustSignals';
import EmergencyAccess from './components/EmergencyAccess';
import LoginHeader from './components/LoginHeader';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <LoginHeader />
            
            {/* Main Login Form */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-modal p-8 border border-border/50">
              <LoginForm />
              
              {/* Additional Links */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary/80 font-medium transition-standard"
                  >
                    Create New Account
                  </Link>
                  <button className="text-muted-foreground hover:text-foreground transition-standard">
                    Forgot Password?
                  </button>
                </div>
                
                {/* Quick Access */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Quick Access for Demo
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 rounded p-2">
                      <p className="font-medium">Student:</p>
                      <p className="text-muted-foreground">student@disasteredu.in</p>
                      <p className="text-muted-foreground">student123</p>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <p className="font-medium">Teacher:</p>
                      <p className="text-muted-foreground">teacher@disasteredu.in</p>
                      <p className="text-muted-foreground">teacher123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Signals & Emergency Access */}
        <div className="hidden lg:flex lg:w-96 xl:w-[28rem] bg-card/30 backdrop-blur-sm border-l border-border/50">
          <div className="flex flex-col justify-center p-8 space-y-6 w-full">
            <TrustSignals />
            <EmergencyAccess />
            
            {/* Footer Info */}
            <div className="text-center pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} DisasterEd Pro. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Developed in partnership with Government of Punjab
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Emergency Access */}
      <div className="lg:hidden fixed bottom-4 right-4 z-20">
        <Link to="/emergency-contacts">
          <Button
            variant="destructive"
            size="icon"
            iconName="Phone"
            className="w-14 h-14 rounded-full shadow-emergency animate-pulse"
          />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
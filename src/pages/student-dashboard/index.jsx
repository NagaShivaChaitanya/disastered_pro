import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import EmergencyAccessBar from '../../components/ui/EmergencyAccessBar';
import WelcomeHeader from './components/WelcomeHeader';
import LearningModulesGrid from './components/LearningModulesGrid';
import GamificationPanel from './components/GamificationPanel';
import QuickActionsGrid from './components/QuickActionsGrid';
import ProgressTrackingSection from './components/ProgressTrackingSection';
import NotificationsWidget from './components/NotificationsWidget';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
      return;
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const formatLastLogin = (loginTime) => {
    if (!loginTime) return 'First time login';
    
    const loginDate = new Date(loginTime);
    const now = new Date();
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return loginDate?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Emergency Access Bar */}
      <EmergencyAccessBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <BreadcrumbTrail />

        {/* Welcome Header */}
        <WelcomeHeader
          userName={`${currentUser?.firstName} ${currentUser?.lastName}`?.trim() || currentUser?.email}
          userRole={currentUser?.role || 'Student'}
          currentTime={formatLastLogin(currentUser?.loginTime)}
        />

        {/* Learning Modules Grid */}
        <LearningModulesGrid />

        {/* Gamification Panel */}
        <GamificationPanel />

        {/* Quick Actions Grid */}
        <QuickActionsGrid />

        {/* Progress Tracking Section */}
        <ProgressTrackingSection />

        {/* Notifications Widget */}
        <div className="mb-8">
          <NotificationsWidget />
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-card border border-border rounded-lg shadow-card">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                24/7 Support
              </h3>
              <p className="text-muted-foreground text-sm">
                Emergency assistance available round the clock for all students
              </p>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg shadow-card">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Regional Focus
              </h3>
              <p className="text-muted-foreground text-sm">
                Content tailored for Indian disaster scenarios and local protocols
              </p>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg shadow-card">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Certified Training
              </h3>
              <p className="text-muted-foreground text-sm">
                NDMA approved curriculum with official certification upon completion
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6 text-muted-foreground text-sm">
            <p>
              © {new Date()?.getFullYear()} DisasterEd Pro. Empowering students with life-saving knowledge.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
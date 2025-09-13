import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginRegister from './pages/login-register';
import DisasterLearningModules from './pages/disaster-learning-modules';
import EmergencyContacts from './pages/emergency-contacts';
import StudentDashboard from './pages/student-dashboard';
import VirtualEmergencyDrills from './pages/virtual-emergency-drills';
import SurvivalGamesHub from './pages/survival-games-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DisasterLearningModules />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/disaster-learning-modules" element={<DisasterLearningModules />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/virtual-emergency-drills" element={<VirtualEmergencyDrills />} />
        <Route path="/survival-games-hub" element={<SurvivalGamesHub />} />
        {/* Legacy routes for backward compatibility */}
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
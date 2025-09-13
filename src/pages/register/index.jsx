import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import RoleSelectionForm from './components/RoleSelectionForm';
import InstitutionForm from './components/InstitutionForm';
import PasswordForm from './components/PasswordForm';
import PreferencesForm from './components/PreferencesForm';
import ConsentForm from './components/ConsentForm';
import ProgressIndicator from './components/ProgressIndicator';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Role Selection
    role: '',
    educationLevel: '',
    subject: '',
    experience: '',
    position: '',
    numberOfChildren: '',
    
    // Institution
    state: '',
    district: '',
    institutionType: '',
    institution: '',
    customInstitution: '',
    institutionAddress: '',
    class: '',
    rollNumber: '',
    employeeId: '',
    
    // Password
    password: '',
    confirmPassword: '',
    
    // Preferences
    preferredLanguage: 'english',
    disasterInterests: [],
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    gamifiedLearning: true,
    interactiveSimulations: true,
    
    // Consent
    termsAccepted: false,
    privacyAccepted: false,
    ndmaCompliance: false,
    parentalConsent: false,
    dataUsageConsent: false,
    emergencyContactSharing: false
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes changes
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 0: // Personal Details
        if (!formData?.firstName) newErrors.firstName = 'First name is required';
        if (!formData?.lastName) newErrors.lastName = 'Last name is required';
        if (!formData?.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
        if (!formData?.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/?.test(formData?.phone?.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        break;
        
      case 1: // Role Selection
        if (!formData?.role) newErrors.role = 'Please select your role';
        if (formData?.role === 'student' && !formData?.educationLevel) {
          newErrors.educationLevel = 'Education level is required for students';
        }
        if (formData?.role === 'teacher' && !formData?.subject) {
          newErrors.subject = 'Subject is required for teachers';
        }
        break;
        
      case 2: // Institution
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.district) newErrors.district = 'District is required';
        break;
        
      case 3: // Password
        if (!formData?.password) newErrors.password = 'Password is required';
        else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      case 4: // Preferences
        if (!formData?.preferredLanguage) newErrors.preferredLanguage = 'Please select a preferred language';
        break;
        
      case 5: // Consent
        if (!formData?.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        if (!formData?.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
        if (!formData?.ndmaCompliance) newErrors.ndmaCompliance = 'NDMA compliance acknowledgment is required';
        
        // Check if parental consent is needed
        const userAge = calculateAge(formData?.dateOfBirth);
        if (userAge !== null && userAge < 18 && !formData?.parentalConsent) {
          newErrors.parentalConsent = 'Parental consent is required for users under 18';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today?.getFullYear() - birthDate?.getFullYear();
    const monthDiff = today?.getMonth() - birthDate?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birthDate?.getDate())) {
      age--;
    }
    return age;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage (in real app, this would be handled by auth service)
      const userData = {
        ...formData,
        id: Date.now(),
        registrationDate: new Date()?.toISOString(),
        isVerified: false,
        status: 'pending-verification'
      };
      
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      localStorage.setItem('registrationComplete', 'true');
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email for verification instructions.',
          type: 'success'
        }
      });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalDetailsForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <RoleSelectionForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 2:
        return (
          <InstitutionForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <PasswordForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <PreferencesForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <ConsentForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onSubmit={handleSubmit}
            onPrev={handlePrev}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/login" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                DisasterEd Pro
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-standard"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-lg shadow-card border border-border">
          <div className="p-6 sm:p-8">
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="max-w-2xl mx-auto">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Access Footer */}
      <div className="bg-destructive/5 border-t border-destructive/20 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <Icon name="AlertTriangle" size={16} className="text-destructive" />
            <span className="text-sm text-muted-foreground">
              Need immediate emergency assistance?
            </span>
            <Link to="/emergency-contacts">
              <button className="text-sm font-medium text-destructive hover:text-destructive/80 transition-standard">
                Emergency Contacts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
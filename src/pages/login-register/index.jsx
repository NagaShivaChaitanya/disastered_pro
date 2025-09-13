import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import LanguageToggle from '../login/components/LanguageToggle';
import TrustSignals from '../login/components/TrustSignals';
import EmergencyAccess from '../login/components/EmergencyAccess';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'student',
    institution: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'administrator', label: 'Administrator' },
    { value: 'parent', label: 'Parent/Guardian' }
  ];

  const institutionOptions = [
    { value: 'govt_school', label: 'Government School' },
    { value: 'private_school', label: 'Private School' },
    { value: 'college', label: 'College/University' },
    { value: 'govt_office', label: 'Government Office' },
    { value: 'ngo', label: 'NGO/Organization' },
    { value: 'other', label: 'Other' }
  ];

  const mockCredentials = {
    student: { email: 'student@disasteredu.in', password: 'student123' },
    teacher: { email: 'teacher@disasteredu.in', password: 'teacher123' },
    administrator: { email: 'admin@disasteredu.in', password: 'admin123' },
    parent: { email: 'parent@disasteredu.in', password: 'parent123' }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e?.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    clearError(name);
  };

  const handleRegisterInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    clearError(name);
  };

  const handleRoleChange = (value, isLogin = true) => {
    if (isLogin) {
      setLoginData(prev => ({ ...prev, role: value }));
    } else {
      setRegisterData(prev => ({ ...prev, role: value }));
    }
  };

  const handleInstitutionChange = (value) => {
    setRegisterData(prev => ({ ...prev, institution: value }));
  };

  const clearError = (field) => {
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!loginData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(loginData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginData?.password) {
      newErrors.password = 'Password is required';
    } else if (loginData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};

    if (!registerData?.firstName) newErrors.firstName = 'First name is required';
    if (!registerData?.lastName) newErrors.lastName = 'Last name is required';
    if (!registerData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(registerData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!registerData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(registerData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!registerData?.institution) newErrors.institution = 'Please select an institution type';
    if (!registerData?.password) {
      newErrors.password = 'Password is required';
    } else if (registerData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!registerData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData?.password !== registerData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms and conditions';
    }
    if (!registerData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateLogin()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const expectedCredentials = mockCredentials?.[loginData?.role];
      
      if (loginData?.email !== expectedCredentials?.email || loginData?.password !== expectedCredentials?.password) {
        setErrors({ 
          submit: `Invalid credentials. Use ${expectedCredentials?.email} with password ${expectedCredentials?.password}` 
        });
        setIsLoading(false);
        return;
      }
      
      const userData = {
        email: loginData?.email,
        role: loginData?.role,
        firstName: loginData?.role?.charAt(0)?.toUpperCase() + loginData?.role?.slice(1),
        lastName: 'User',
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      navigate('/student-dashboard');
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    
    if (!validateRegister()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        ...registerData,
        id: Date.now(),
        registrationDate: new Date()?.toISOString(),
        isVerified: false,
        status: 'pending-verification'
      };
      
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      localStorage.setItem('registrationComplete', 'true');
      
      // Switch to login tab after successful registration
      setActiveTab('login');
      setErrors({ success: 'Registration successful! Please login with your credentials.' });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle />
      </div>
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
                <Icon name="Shield" size={32} color="white" />
              </div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                DisasterEd Pro
              </h1>
              <p className="text-muted-foreground mt-2">
                Your gateway to disaster preparedness education
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-modal border border-border/50 overflow-hidden">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 px-6 font-medium text-sm transition-standard ${
                    activeTab === 'login' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name="LogIn" size={16} className="inline mr-2" />
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-4 px-6 font-medium text-sm transition-standard ${
                    activeTab === 'register' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name="UserPlus" size={16} className="inline mr-2" />
                  Register
                </button>
              </div>

              <div className="p-8">
                {/* Success/Error Messages */}
                {errors?.submit && (
                  <div className="bg-error/10 border border-error/20 text-error text-sm p-3 rounded-md flex items-start space-x-2 mb-6">
                    <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{errors?.submit}</span>
                  </div>
                )}

                {errors?.success && (
                  <div className="bg-success/10 border border-success/20 text-success text-sm p-3 rounded-md flex items-start space-x-2 mb-6">
                    <Icon name="CheckCircle" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{errors?.success}</span>
                  </div>
                )}

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <Select
                      label="Select Your Role"
                      options={roleOptions}
                      value={loginData?.role}
                      onChange={(value) => handleRoleChange(value, true)}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={loginData?.email}
                      onChange={handleLoginInputChange}
                      error={errors?.email}
                      placeholder="Enter your email address"
                      required
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={loginData?.password}
                      onChange={handleLoginInputChange}
                      error={errors?.password}
                      placeholder="Enter your password"
                      required
                    />

                    <div className="flex items-center justify-between text-sm">
                      <Link 
                        to="/emergency-contacts" 
                        className="text-muted-foreground hover:text-foreground transition-standard"
                      >
                        Emergency Access
                      </Link>
                      <button 
                        type="button"
                        className="text-primary hover:text-primary/80 font-medium transition-standard"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isLoading}
                      fullWidth
                      iconName="LogIn"
                      iconPosition="right"
                    >
                      Login to Dashboard
                    </Button>

                    {/* Quick Access Demo Credentials */}
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
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={registerData?.firstName}
                        onChange={handleRegisterInputChange}
                        error={errors?.firstName}
                        placeholder="Enter your first name"
                        required
                      />

                      <Input
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={registerData?.lastName}
                        onChange={handleRegisterInputChange}
                        error={errors?.lastName}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={registerData?.email}
                      onChange={handleRegisterInputChange}
                      error={errors?.email}
                      placeholder="Enter your email address"
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={registerData?.phone}
                      onChange={handleRegisterInputChange}
                      error={errors?.phone}
                      placeholder="Enter your phone number"
                      required
                    />

                    <Select
                      label="Select Your Role"
                      options={roleOptions}
                      value={registerData?.role}
                      onChange={(value) => handleRoleChange(value, false)}
                    />

                    <Select
                      label="Institution Type"
                      options={institutionOptions}
                      value={registerData?.institution}
                      onChange={handleInstitutionChange}
                      error={errors?.institution}
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={registerData?.password}
                      onChange={handleRegisterInputChange}
                      error={errors?.password}
                      placeholder="Create a strong password"
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={registerData?.confirmPassword}
                      onChange={handleRegisterInputChange}
                      error={errors?.confirmPassword}
                      placeholder="Confirm your password"
                      required
                    />

                    <div className="space-y-3">
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={registerData?.agreeToTerms}
                        onChange={handleRegisterInputChange}
                        label={
                          <span className="text-sm">
                            I agree to the{' '}
                            <Link to="#" className="text-primary hover:text-primary/80 font-medium">
                              Terms and Conditions
                            </Link>
                          </span>
                        }
                        error={errors?.agreeToTerms}
                      />

                      <Checkbox
                        id="agreeToPrivacy"
                        name="agreeToPrivacy"
                        checked={registerData?.agreeToPrivacy}
                        onChange={handleRegisterInputChange}
                        label={
                          <span className="text-sm">
                            I agree to the{' '}
                            <Link to="#" className="text-primary hover:text-primary/80 font-medium">
                              Privacy Policy
                            </Link>
                          </span>
                        }
                        error={errors?.agreeToPrivacy}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isLoading}
                      fullWidth
                      iconName="UserPlus"
                      iconPosition="right"
                    >
                      Create Account
                    </Button>
                  </form>
                )}
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
                © {new Date()?.getFullYear()} DisasterEd Pro. All rights reserved.
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

export default LoginRegister;
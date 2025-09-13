import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationFlow = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData?.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage (in real app, this would be handled by auth service)
      const userData = {
        email: formData?.email,
        firstName: formData?.firstName || 'User',
        lastName: formData?.lastName || '',
        role: formData?.role,
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/student-dashboard');
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'administrator', label: 'Administrator' },
    { value: 'parent', label: 'Parent/Guardian' }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-card">
              <Icon name="Shield" size={24} color="white" />
            </div>
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground">
            DisasterEd Pro
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'login' ?'Sign in to access your disaster preparedness training' :'Create your account to start learning disaster preparedness'
            }
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  error={errors?.firstName}
                  placeholder="Enter first name"
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                  error={errors?.lastName}
                  placeholder="Enter last name"
                  required
                />
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              placeholder="Enter your password"
              required
            />

            {mode === 'register' && (
              <>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  placeholder="Confirm your password"
                  required
                />

                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData?.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    {roleOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {errors?.submit && (
            <div className="text-error text-sm text-center bg-error/10 p-3 rounded-md">
              {errors?.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            fullWidth
            className="mt-6"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={mode === 'login' ? '/register' : '/login'}
                className="font-medium text-primary hover:text-primary/80 transition-standard"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>

          {/* Emergency Access */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">
                Need immediate emergency assistance?
              </p>
              <Link to="/emergency-contacts">
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  className="shadow-emergency"
                >
                  Emergency Contacts
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationFlow;
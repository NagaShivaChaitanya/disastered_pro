import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'administrator', label: 'Administrator' },
    { value: 'parent', label: 'Parent/Guardian' }
  ];

  const mockCredentials = {
    student: { email: 'student@disasteredu.in', password: 'student123' },
    teacher: { email: 'teacher@disasteredu.in', password: 'teacher123' },
    administrator: { email: 'admin@disasteredu.in', password: 'admin123' },
    parent: { email: 'parent@disasteredu.in', password: 'parent123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const expectedCredentials = mockCredentials?.[formData?.role];
      
      if (formData?.email !== expectedCredentials?.email || formData?.password !== expectedCredentials?.password) {
        setErrors({ 
          submit: `Invalid credentials. Use ${expectedCredentials?.email} with password ${expectedCredentials?.password}` 
        });
        setIsLoading(false);
        return;
      }
      
      const userData = {
        email: formData?.email,
        role: formData?.role,
        firstName: formData?.role?.charAt(0)?.toUpperCase() + formData?.role?.slice(1),
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

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Select
            label="Select Your Role"
            options={roleOptions}
            value={formData?.role}
            onChange={handleRoleChange}
            className="mb-4"
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            placeholder="Enter your email address"
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
        </div>

        {errors?.submit && (
          <div className="bg-error/10 border border-error/20 text-error text-sm p-3 rounded-md flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{errors?.submit}</span>
          </div>
        )}

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
      </form>
    </div>
  );
};

export default LoginForm;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactForm = ({ 
  contact = null, 
  category = '', 
  onSave, 
  onCancel, 
  isVisible = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    department: '',
    location: '',
    specialInstructions: '',
    category: category,
    icon: 'User',
    status: 'available',
    verified: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        ...contact,
        category: contact?.category || category
      });
    } else {
      setFormData(prev => ({
        ...prev,
        category: category
      }));
    }
  }, [contact, category]);

  const iconOptions = [
    { value: 'User', label: 'Person' },
    { value: 'Shield', label: 'Security' },
    { value: 'Heart', label: 'Medical' },
    { value: 'Flame', label: 'Fire' },
    { value: 'Building', label: 'Institution' },
    { value: 'Users', label: 'Family' },
    { value: 'Phone', label: 'Contact' },
    { value: 'UserCheck', label: 'Administrator' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'unavailable', label: 'Unavailable' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.role?.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const contactData = {
        ...formData,
        id: contact?.id || Date.now()?.toString(),
        lastSeen: new Date()?.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        })
      };
      
      if (onSave) {
        onSave(contactData);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save contact. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="UserPlus" size={20} className="text-primary" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              {contact ? 'Edit Contact' : 'Add New Contact'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onCancel}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                error={errors?.name}
                placeholder="Enter full name"
                required
              />
              
              <Input
                label="Role/Position"
                type="text"
                name="role"
                value={formData?.role}
                onChange={handleInputChange}
                error={errors?.role}
                placeholder="e.g., Principal, Teacher, Parent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                error={errors?.phone}
                placeholder="+91 98765 43210"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Additional Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Department/Organization"
                type="text"
                name="department"
                value={formData?.department}
                onChange={handleInputChange}
                placeholder="e.g., Administration, Science Dept"
              />
              
              <Input
                label="Location"
                type="text"
                name="location"
                value={formData?.location}
                onChange={handleInputChange}
                placeholder="e.g., Main Office, Block A"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Icon
                </label>
                <select
                  name="icon"
                  value={formData?.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {iconOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {statusOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                value={formData?.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any special instructions for contacting this person..."
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                name="verified"
                checked={formData?.verified}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
              />
              <label htmlFor="verified" className="text-sm font-body text-foreground">
                This contact has been verified
              </label>
            </div>
          </div>

          {errors?.submit && (
            <div className="text-error text-sm text-center bg-error/10 p-3 rounded-md">
              {errors?.submit}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {contact ? 'Update Contact' : 'Save Contact'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
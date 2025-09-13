import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalDetailsForm = ({ formData, errors, onChange, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onChange(name, value);
  };

  const handleSelectChange = (name, value) => {
    onChange(name, value);
  };

  const handleNext = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const hasErrors = requiredFields?.some(field => !formData?.[field]);
    
    if (!hasErrors) {
      onNext();
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Personal Information</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Please provide your basic details to create your account
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          placeholder="Enter your first name"
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          placeholder="Enter your last name"
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        placeholder="Enter your email address"
        description="We'll use this for account verification and important notifications"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData?.phone}
        onChange={handleInputChange}
        error={errors?.phone}
        placeholder="Enter your 10-digit mobile number"
        description="Required for emergency notifications and SMS alerts"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          error={errors?.dateOfBirth}
          required
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleSelectChange('gender', value)}
          placeholder="Select gender"
          className="w-full"
        />
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-standard font-medium"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const InstitutionForm = ({ formData, errors, onChange, onNext, onPrev }) => {
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);

  const stateOptions = [
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' }
  ];

  const districtData = {
    'punjab': [
      { value: 'ludhiana', label: 'Ludhiana' },
      { value: 'amritsar', label: 'Amritsar' },
      { value: 'jalandhar', label: 'Jalandhar' },
      { value: 'patiala', label: 'Patiala' },
      { value: 'bathinda', label: 'Bathinda' },
      { value: 'mohali', label: 'Mohali' },
      { value: 'ferozepur', label: 'Ferozepur' }
    ],
    'haryana': [
      { value: 'gurgaon', label: 'Gurgaon' },
      { value: 'faridabad', label: 'Faridabad' },
      { value: 'panipat', label: 'Panipat' },
      { value: 'ambala', label: 'Ambala' },
      { value: 'karnal', label: 'Karnal' }
    ],
    'delhi': [
      { value: 'new-delhi', label: 'New Delhi' },
      { value: 'north-delhi', label: 'North Delhi' },
      { value: 'south-delhi', label: 'South Delhi' },
      { value: 'east-delhi', label: 'East Delhi' },
      { value: 'west-delhi', label: 'West Delhi' }
    ]
  };

  const institutionData = {
    'ludhiana': [
      { value: 'dav-public-school-ludhiana', label: 'DAV Public School, Ludhiana' },
      { value: 'sacred-heart-school-ludhiana', label: 'Sacred Heart School, Ludhiana' },
      { value: 'punjab-agricultural-university', label: 'Punjab Agricultural University' },
      { value: 'guru-nanak-dev-engineering-college', label: 'Guru Nanak Dev Engineering College' }
    ],
    'amritsar': [
      { value: 'khalsa-college-amritsar', label: 'Khalsa College, Amritsar' },
      { value: 'dav-college-amritsar', label: 'DAV College, Amritsar' },
      { value: 'guru-nanak-dev-university', label: 'Guru Nanak Dev University' }
    ],
    'jalandhar': [
      { value: 'lovely-professional-university', label: 'Lovely Professional University' },
      { value: 'dav-university-jalandhar', label: 'DAV University, Jalandhar' },
      { value: 'st-soldier-school', label: 'St. Soldier School' }
    ]
  };

  const institutionTypeOptions = [
    { value: 'government', label: 'Government School/College' },
    { value: 'private', label: 'Private School/College' },
    { value: 'aided', label: 'Government Aided' },
    { value: 'international', label: 'International School' },
    { value: 'university', label: 'University' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (formData?.state) {
      setFilteredDistricts(districtData?.[formData?.state] || []);
      onChange('district', '');
      onChange('institution', '');
    }
  }, [formData?.state]);

  useEffect(() => {
    if (formData?.district) {
      setFilteredInstitutions(institutionData?.[formData?.district] || []);
      onChange('institution', '');
    }
  }, [formData?.district]);

  const handleSelectChange = (name, value) => {
    onChange(name, value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onChange(name, value);
  };

  const handleNext = () => {
    const requiredFields = ['state', 'district'];
    const hasErrors = requiredFields?.some(field => !formData?.[field]);
    
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Institution Details</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Connect with your educational institution for personalized content
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="State"
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => handleSelectChange('state', value)}
          placeholder="Select your state"
          error={errors?.state}
          searchable
          required
        />

        <Select
          label="District"
          options={filteredDistricts}
          value={formData?.district}
          onChange={(value) => handleSelectChange('district', value)}
          placeholder="Select your district"
          error={errors?.district}
          disabled={!formData?.state}
          searchable
          required
        />
      </div>
      <Select
        label="Institution Type"
        options={institutionTypeOptions}
        value={formData?.institutionType}
        onChange={(value) => handleSelectChange('institutionType', value)}
        placeholder="Select institution type"
      />
      <div className="space-y-4">
        <Select
          label="Institution"
          options={filteredInstitutions}
          value={formData?.institution}
          onChange={(value) => handleSelectChange('institution', value)}
          placeholder="Search and select your institution"
          disabled={!formData?.district}
          searchable
          description="Can't find your institution? You can add it manually below."
        />

        {formData?.institution === '' && formData?.district && (
          <Input
            label="Institution Name (Manual Entry)"
            type="text"
            name="customInstitution"
            value={formData?.customInstitution}
            onChange={handleInputChange}
            placeholder="Enter your institution name"
            description="Please enter the full name of your educational institution"
          />
        )}
      </div>
      <Input
        label="Institution Address"
        type="text"
        name="institutionAddress"
        value={formData?.institutionAddress}
        onChange={handleInputChange}
        placeholder="Enter complete address (optional)"
        description="This helps us provide location-specific disaster preparedness information"
      />
      {formData?.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Class/Grade"
            type="text"
            name="class"
            value={formData?.class}
            onChange={handleInputChange}
            placeholder="e.g., Class 10, Grade 12, B.Tech 2nd Year"
          />

          <Input
            label="Roll Number/Student ID"
            type="text"
            name="rollNumber"
            value={formData?.rollNumber}
            onChange={handleInputChange}
            placeholder="Enter your roll number or student ID"
          />
        </div>
      )}
      {(formData?.role === 'teacher' || formData?.role === 'administrator') && (
        <Input
          label="Employee ID"
          type="text"
          name="employeeId"
          value={formData?.employeeId}
          onChange={handleInputChange}
          placeholder="Enter your employee ID (optional)"
          description="This helps verify your association with the institution"
        />
      )}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Institution Verification</h4>
            <p className="text-sm text-muted-foreground">
              Your institution details will be verified to ensure authentic participation in disaster preparedness programs. 
              This process may take 24-48 hours for manual entries.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-standard font-medium"
        >
          Previous
        </button>
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

export default InstitutionForm;
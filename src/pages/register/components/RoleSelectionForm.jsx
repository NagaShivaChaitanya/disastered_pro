import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RoleSelectionForm = ({ formData, errors, onChange, onNext, onPrev }) => {
  const handleSelectChange = (name, value) => {
    onChange(name, value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onChange(name, value);
  };

  const roleOptions = [
    { 
      value: 'student', 
      label: 'Student', 
      description: 'K-12 or college student learning disaster preparedness' 
    },
    { 
      value: 'teacher', 
      label: 'Teacher/Faculty', 
      description: 'Educator facilitating disaster education and drills' 
    },
    { 
      value: 'administrator', 
      label: 'Administrator', 
      description: 'School/college administrator managing safety protocols' 
    },
    { 
      value: 'parent', 
      label: 'Parent/Guardian', 
      description: 'Parent or guardian monitoring child\'s safety preparedness' 
    }
  ];

  const educationLevelOptions = [
    { value: 'primary', label: 'Primary School (Classes 1-5)' },
    { value: 'middle', label: 'Middle School (Classes 6-8)' },
    { value: 'secondary', label: 'Secondary School (Classes 9-10)' },
    { value: 'senior-secondary', label: 'Senior Secondary (Classes 11-12)' },
    { value: 'undergraduate', label: 'Undergraduate College' },
    { value: 'postgraduate', label: 'Postgraduate College' },
    { value: 'other', label: 'Other' }
  ];

  const subjectOptions = [
    { value: 'science', label: 'Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'social-studies', label: 'Social Studies' },
    { value: 'geography', label: 'Geography' },
    { value: 'environmental-science', label: 'Environmental Science' },
    { value: 'physical-education', label: 'Physical Education' },
    { value: 'other', label: 'Other' }
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return 'GraduationCap';
      case 'teacher': return 'BookOpen';
      case 'administrator': return 'Shield';
      case 'parent': return 'Users';
      default: return 'User';
    }
  };

  const handleNext = () => {
    const requiredFields = ['role'];
    if (formData?.role === 'student') {
      requiredFields?.push('educationLevel');
    }
    if (formData?.role === 'teacher') {
      requiredFields?.push('subject');
    }
    
    const hasErrors = requiredFields?.some(field => !formData?.[field]);
    
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Role Selection</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Choose your role to customize your disaster preparedness experience
        </p>
      </div>
      <Select
        label="Select Your Role"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleSelectChange('role', value)}
        placeholder="Choose your role"
        description="This helps us provide relevant content and features"
        error={errors?.role}
        required
      />
      {formData?.role && (
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name={getRoleIcon(formData?.role)} size={20} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {roleOptions?.find(r => r?.value === formData?.role)?.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {roleOptions?.find(r => r?.value === formData?.role)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
      {formData?.role === 'student' && (
        <Select
          label="Education Level"
          options={educationLevelOptions}
          value={formData?.educationLevel}
          onChange={(value) => handleSelectChange('educationLevel', value)}
          placeholder="Select your current education level"
          error={errors?.educationLevel}
          required
        />
      )}
      {formData?.role === 'teacher' && (
        <div className="space-y-4">
          <Select
            label="Primary Subject"
            options={subjectOptions}
            value={formData?.subject}
            onChange={(value) => handleSelectChange('subject', value)}
            placeholder="Select your primary teaching subject"
            error={errors?.subject}
            required
          />
          
          <Input
            label="Years of Experience"
            type="number"
            name="experience"
            value={formData?.experience}
            onChange={handleInputChange}
            placeholder="Enter years of teaching experience"
            min="0"
            max="50"
          />
        </div>
      )}
      {formData?.role === 'administrator' && (
        <Input
          label="Position/Title"
          type="text"
          name="position"
          value={formData?.position}
          onChange={handleInputChange}
          placeholder="e.g., Principal, Vice Principal, Safety Coordinator"
          description="Your administrative role in the institution"
        />
      )}
      {formData?.role === 'parent' && (
        <Input
          label="Number of Children"
          type="number"
          name="numberOfChildren"
          value={formData?.numberOfChildren}
          onChange={handleInputChange}
          placeholder="Enter number of children"
          min="1"
          max="10"
          description="Children enrolled in educational institutions"
        />
      )}
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

export default RoleSelectionForm;
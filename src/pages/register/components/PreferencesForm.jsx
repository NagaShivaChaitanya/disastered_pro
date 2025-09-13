import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PreferencesForm = ({ formData, errors, onChange, onNext, onPrev }) => {
  const handleSelectChange = (name, value) => {
    onChange(name, value);
  };

  const handleCheckboxChange = (name, checked) => {
    onChange(name, checked);
  };

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' }
  ];

  const disasterInterestOptions = [
    { value: 'earthquakes', label: 'Earthquakes' },
    { value: 'floods', label: 'Floods' },
    { value: 'cyclones', label: 'Cyclones/Hurricanes' },
    { value: 'droughts', label: 'Droughts' },
    { value: 'landslides', label: 'Landslides' },
    { value: 'fires', label: 'Fires' },
    { value: 'industrial-accidents', label: 'Industrial Accidents' },
    { value: 'health-emergencies', label: 'Health Emergencies' },
    { value: 'terrorism', label: 'Security Threats' },
    { value: 'all', label: 'All Disaster Types' }
  ];

  const notificationPreferences = [
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive updates and alerts via email'
    },
    {
      key: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive emergency alerts via SMS'
    },
    {
      key: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive notifications in the app'
    },
    {
      key: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'Get weekly summary of activities and progress'
    }
  ];

  const handleNext = () => {
    const requiredFields = ['preferredLanguage'];
    const hasErrors = requiredFields?.some(field => !formData?.[field]);
    
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Preferences & Settings</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Customize your learning experience and notification preferences
        </p>
      </div>
      <Select
        label="Preferred Language"
        options={languageOptions}
        value={formData?.preferredLanguage}
        onChange={(value) => handleSelectChange('preferredLanguage', value)}
        placeholder="Select your preferred language"
        description="Content will be displayed in your selected language when available"
        error={errors?.preferredLanguage}
        searchable
        required
      />
      <Select
        label="Disaster Types of Interest"
        options={disasterInterestOptions}
        value={formData?.disasterInterests}
        onChange={(value) => handleSelectChange('disasterInterests', value)}
        placeholder="Select disaster types you want to learn about"
        description="We'll prioritize content based on your interests and regional risks"
        multiple
        searchable
      />
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Notification Preferences
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose how you'd like to receive updates and emergency alerts
          </p>
        </div>

        <div className="space-y-3">
          {notificationPreferences?.map((pref) => (
            <div key={pref?.key} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
              <Checkbox
                checked={formData?.[pref?.key] || false}
                onChange={(e) => handleCheckboxChange(pref?.key, e?.target?.checked)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <label className="font-medium text-foreground cursor-pointer">
                  {pref?.label}
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  {pref?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {formData?.role === 'student' && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Learning Preferences
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <Checkbox
                label="Gamified Learning"
                description="Earn points, badges, and compete on leaderboards"
                checked={formData?.gamifiedLearning || false}
                onChange={(e) => handleCheckboxChange('gamifiedLearning', e?.target?.checked)}
              />
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <Checkbox
                label="Interactive Simulations"
                description="Participate in virtual emergency scenarios"
                checked={formData?.interactiveSimulations || false}
                onChange={(e) => handleCheckboxChange('interactiveSimulations', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Settings" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Customization</h4>
            <p className="text-sm text-muted-foreground">
              You can change these preferences anytime from your account settings. 
              We'll use this information to provide you with the most relevant disaster preparedness content.
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

export default PreferencesForm;
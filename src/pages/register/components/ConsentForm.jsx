import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ConsentForm = ({ formData, errors, onChange, onSubmit, onPrev, isLoading }) => {
  const handleCheckboxChange = (name, checked) => {
    onChange(name, checked);
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

  const userAge = calculateAge(formData?.dateOfBirth);
  const isMinor = userAge !== null && userAge < 18;

  const canSubmit = formData?.termsAccepted && 
                   formData?.privacyAccepted && 
                   formData?.ndmaCompliance && 
                   (!isMinor || formData?.parentalConsent);

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Terms & Consent</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Please review and accept the following terms to complete your registration
        </p>
      </div>
      <div className="space-y-4">
        {/* Terms and Conditions */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={formData?.termsAccepted || false}
              onChange={(e) => handleCheckboxChange('termsAccepted', e?.target?.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="font-medium text-foreground cursor-pointer">
                I accept the Terms and Conditions
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                By checking this box, you agree to our terms of service, user guidelines, and platform policies. 
                <a href="#" className="text-primary hover:underline ml-1">Read full terms</a>
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={formData?.privacyAccepted || false}
              onChange={(e) => handleCheckboxChange('privacyAccepted', e?.target?.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="font-medium text-foreground cursor-pointer">
                I accept the Privacy Policy
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                We are committed to protecting your personal information and data privacy. 
                <a href="#" className="text-primary hover:underline ml-1">Read privacy policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* NDMA Compliance */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={formData?.ndmaCompliance || false}
              onChange={(e) => handleCheckboxChange('ndmaCompliance', e?.target?.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="font-medium text-foreground cursor-pointer">
                NDMA Compliance Acknowledgment
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                I acknowledge that this platform follows National Disaster Management Authority (NDMA) guidelines 
                and I consent to participate in disaster preparedness programs.
              </p>
            </div>
          </div>
        </div>

        {/* Parental Consent for Minors */}
        {isMinor && (
          <div className="border border-warning/20 bg-warning/5 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-2">Parental Consent Required</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  As you are under 18 years of age, parental or guardian consent is required to create an account.
                </p>
                <Checkbox
                  checked={formData?.parentalConsent || false}
                  onChange={(e) => handleCheckboxChange('parentalConsent', e?.target?.checked)}
                  label="I have obtained consent from my parent/guardian to create this account"
                  description="Your parent/guardian has approved your participation in disaster preparedness education"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data Usage Consent */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={formData?.dataUsageConsent || false}
              onChange={(e) => handleCheckboxChange('dataUsageConsent', e?.target?.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="font-medium text-foreground cursor-pointer">
                Data Usage for Educational Purposes (Optional)
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Allow anonymized usage data to be used for improving disaster preparedness education 
                and research purposes. This is optional and does not affect your account functionality.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Sharing */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={formData?.emergencyContactSharing || false}
              onChange={(e) => handleCheckboxChange('emergencyContactSharing', e?.target?.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label className="font-medium text-foreground cursor-pointer">
                Emergency Contact Information Sharing (Optional)
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Allow your emergency contact information to be shared with local disaster response teams 
                and your educational institution during actual emergencies.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Important Information */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Important Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your account will be verified within 24-48 hours</li>
              <li>• You'll receive a confirmation email with next steps</li>
              <li>• Emergency features are available immediately after registration</li>
              <li>• You can modify most preferences from your account settings</li>
            </ul>
          </div>
        </div>
      </div>
      {errors?.submit && (
        <div className="text-error text-sm text-center bg-error/10 p-3 rounded-md">
          {errors?.submit}
        </div>
      )}
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          disabled={isLoading}
          className="px-6 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-standard font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className="px-8 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-standard font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isLoading && <Icon name="Loader2" size={16} className="animate-spin" />}
          <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
        </button>
      </div>
    </div>
  );
};

export default ConsentForm;
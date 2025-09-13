import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordForm = ({ formData, errors, onChange, onNext, onPrev }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onChange(name, value);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    const checks = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };

    strength = Object.values(checks)?.filter(Boolean)?.length;

    if (strength <= 2) return { strength, label: 'Weak', color: 'text-error' };
    if (strength <= 3) return { strength, label: 'Fair', color: 'text-warning' };
    if (strength <= 4) return { strength, label: 'Good', color: 'text-accent' };
    return { strength, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData?.password?.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/?.test(formData?.password) },
    { text: 'One lowercase letter', met: /[a-z]/?.test(formData?.password) },
    { text: 'One number', met: /\d/?.test(formData?.password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) }
  ];

  const handleNext = () => {
    const hasValidPassword = passwordStrength?.strength >= 3;
    const passwordsMatch = formData?.password === formData?.confirmPassword;
    
    if (hasValidPassword && passwordsMatch && formData?.password && formData?.confirmPassword) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Create Password</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Choose a strong password to secure your account
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            placeholder="Create a strong password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-standard"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password strength:</span>
              <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.label}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength?.strength <= 2 ? 'bg-error' :
                  passwordStrength?.strength <= 3 ? 'bg-warning' :
                  passwordStrength?.strength <= 4 ? 'bg-accent' : 'bg-success'
                }`}
                style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={req?.met ? "CheckCircle" : "Circle"} 
                    size={14} 
                    className={req?.met ? 'text-success' : 'text-muted-foreground'} 
                  />
                  <span className={req?.met ? 'text-success' : 'text-muted-foreground'}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-standard"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {formData?.confirmPassword && formData?.password !== formData?.confirmPassword && (
          <div className="flex items-center space-x-2 text-error text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>Passwords do not match</span>
          </div>
        )}

        {formData?.confirmPassword && formData?.password === formData?.confirmPassword && (
          <div className="flex items-center space-x-2 text-success text-sm">
            <Icon name="CheckCircle" size={16} />
            <span>Passwords match</span>
          </div>
        )}
      </div>
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Password Security Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a unique password for this account</li>
              <li>• Avoid using personal information</li>
              <li>• Consider using a password manager</li>
              <li>• Never share your password with others</li>
            </ul>
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
          disabled={passwordStrength?.strength < 3 || formData?.password !== formData?.confirmPassword || !formData?.password || !formData?.confirmPassword}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-standard font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
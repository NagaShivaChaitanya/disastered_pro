import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { label: 'Personal Details', icon: 'User' },
    { label: 'Role Selection', icon: 'UserCheck' },
    { label: 'Institution', icon: 'Building' },
    { label: 'Password', icon: 'Lock' },
    { label: 'Preferences', icon: 'Settings' },
    { label: 'Terms & Consent', icon: 'FileCheck' }
  ];

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full mb-8">
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-foreground">
            {steps?.[currentStep]?.label}
          </span>
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <nav aria-label="Registration progress">
          <ol className="flex items-center justify-between">
            {steps?.map((step, index) => {
              const status = getStepStatus(index);
              
              return (
                <li key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        status === 'completed'
                          ? 'bg-primary border-primary text-primary-foreground'
                          : status === 'current' ?'bg-primary/10 border-primary text-primary' :'bg-background border-muted-foreground/30 text-muted-foreground'
                      }`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step?.icon} size={16} />
                      )}
                    </div>
                    
                    <span
                      className={`mt-2 text-xs font-medium text-center max-w-20 ${
                        status === 'current' ?'text-primary'
                          : status === 'completed' ?'text-foreground' :'text-muted-foreground'
                      }`}
                    >
                      {step?.label}
                    </span>
                  </div>
                  {index < steps?.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                        index < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                      style={{ minWidth: '2rem' }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default ProgressIndicator;
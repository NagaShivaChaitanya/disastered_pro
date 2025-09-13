import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('language-change', {
      detail: { language }
    }));
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-lg p-2 border border-border/50">
      <Icon name="Globe" size={16} className="text-muted-foreground" />
      <div className="flex space-x-1">
        {languages?.map((lang) => (
          <Button
            key={lang?.code}
            variant={currentLanguage === lang?.code ? "default" : "ghost"}
            size="sm"
            onClick={() => handleLanguageChange(lang?.code)}
            className="text-xs px-3 py-1.5 h-auto"
          >
            <span className="mr-1">{lang?.flag}</span>
            {lang?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
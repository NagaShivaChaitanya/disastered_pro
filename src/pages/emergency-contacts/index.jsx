import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import EmergencyHeader from './components/EmergencyHeader';
import ContactCategory from './components/ContactCategory';
import QuickActionPanel from './components/QuickActionPanel';
import ContactForm from './components/ContactForm';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmergencyContacts = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('student');

  // Mock data for emergency contacts
  const [contactsData, setContactsData] = useState({
    "Emergency Services": [
      {
        id: "es1",
        name: "National Emergency Services",
        role: "Emergency Coordinator",
        phone: "112",
        email: "emergency@gov.in",
        location: "National Control Room",
        icon: "Phone",
        status: "available",
        verified: true,
        lastSeen: "Always Available",
        specialInstructions: "Primary emergency number for all types of emergencies in India"
      },
      {
        id: "es2",
        name: "Fire Department Punjab",
        role: "Fire Chief",
        phone: "101",
        email: "fire@punjab.gov.in",
        location: "Punjab Fire Station",
        icon: "Flame",
        status: "available",
        verified: true,
        lastSeen: "2 min ago",
        specialInstructions: "Available 24/7 for fire emergencies and rescue operations"
      },
      {
        id: "es3",
        name: "Punjab Police Control Room",
        role: "Duty Officer",
        phone: "100",
        email: "control@punjabpolice.gov.in",
        location: "State Police Headquarters",
        icon: "Shield",
        status: "available",
        verified: true,
        lastSeen: "1 min ago",
        specialInstructions: "For law and order situations, crime reporting"
      },
      {
        id: "es4",
        name: "Ambulance Services",
        role: "Medical Emergency",
        phone: "108",
        email: "ambulance@health.punjab.gov.in",
        location: "Medical Emergency Center",
        icon: "Heart",
        status: "available",
        verified: true,
        lastSeen: "Active",
        specialInstructions: "Free ambulance service available across Punjab"
      }
    ],
    "Institutional Contacts": [
      {
        id: "ic1",
        name: "Dr. Rajesh Kumar",
        role: "Principal",
        phone: "+91 98765 43210",
        email: "principal@school.edu.in",
        department: "Administration",
        location: "Principal Office, Block A",
        icon: "UserCheck",
        status: "available",
        verified: true,
        lastSeen: "5 min ago",
        specialInstructions: "Primary contact for all institutional emergencies"
      },
      {
        id: "ic2",
        name: "Mrs. Priya Sharma",
        role: "Vice Principal",
        phone: "+91 98765 43211",
        email: "vp@school.edu.in",
        department: "Administration",
        location: "Admin Block, Room 102",
        icon: "User",
        status: "busy",
        verified: true,
        lastSeen: "10 min ago",
        specialInstructions: "Secondary contact when principal is unavailable"
      },
      {
        id: "ic3",
        name: "Mr. Amit Singh",
        role: "Safety Coordinator",
        phone: "+91 98765 43212",
        email: "safety@school.edu.in",
        department: "Safety & Security",
        location: "Security Office",
        icon: "Shield",
        status: "available",
        verified: true,
        lastSeen: "2 min ago",
        specialInstructions: "Responsible for emergency drills and safety protocols"
      },
      {
        id: "ic4",
        name: "Dr. Sunita Patel",
        role: "School Nurse",
        phone: "+91 98765 43213",
        email: "nurse@school.edu.in",
        department: "Medical",
        location: "Medical Room, Ground Floor",
        icon: "Heart",
        status: "available",
        verified: true,
        lastSeen: "3 min ago",
        specialInstructions: "First aid and medical emergencies within school premises"
      }
    ],
    "Family Members": [
      {
        id: "fm1",
        name: "Rajesh Gupta",
        role: "Father",
        phone: "+91 98765 43214",
        email: "rajesh.gupta@email.com",
        location: "Home",
        icon: "User",
        status: "available",
        verified: true,
        lastSeen: "1 hour ago",
        specialInstructions: "Primary emergency contact for student"
      },
      {
        id: "fm2",
        name: "Sunita Gupta",
        role: "Mother",
        phone: "+91 98765 43215",
        email: "sunita.gupta@email.com",
        location: "Office",
        icon: "User",
        status: "busy",
        verified: true,
        lastSeen: "30 min ago",
        specialInstructions: "Secondary emergency contact, works at local hospital"
      },
      {
        id: "fm3",
        name: "Vikram Gupta",
        role: "Elder Brother",
        phone: "+91 98765 43216",
        email: "vikram.gupta@email.com",
        location: "College",
        icon: "User",
        status: "available",
        verified: false,
        lastSeen: "2 hours ago",
        specialInstructions: "Can pick up in case parents are unavailable"
      }
    ],
    "Disaster Response Teams": [
      {
        id: "drt1",
        name: "Punjab NDRF Team",
        role: "Disaster Response Commander",
        phone: "+91 98765 43217",
        email: "ndrf.punjab@gov.in",
        department: "National Disaster Response Force",
        location: "NDRF Battalion, Bathinda",
        icon: "Shield",
        status: "available",
        verified: true,
        lastSeen: "Active",
        specialInstructions: "Specialized in natural disaster response and rescue operations"
      },
      {
        id: "drt2",
        name: "District Collector Office",
        role: "Emergency Coordinator",
        phone: "+91 98765 43218",
        email: "collector@district.punjab.gov.in",
        department: "District Administration",
        location: "Collectorate Office",
        icon: "Building",
        status: "available",
        verified: true,
        lastSeen: "15 min ago",
        specialInstructions: "Coordinates district-level emergency response"
      },
      {
        id: "drt3",
        name: "Red Cross Punjab",
        role: "Volunteer Coordinator",
        phone: "+91 98765 43219",
        email: "punjab@redcross.org.in",
        department: "Humanitarian Aid",
        location: "Red Cross Office",
        icon: "Heart",
        status: "available",
        verified: true,
        lastSeen: "20 min ago",
        specialInstructions: "Provides humanitarian aid and disaster relief"
      }
    ]
  });

  const categories = [
    {
      name: "Emergency Services",
      description: "National and state emergency services available 24/7",
      priority: true
    },
    {
      name: "Institutional Contacts",
      description: "School administration and safety personnel"
    },
    {
      name: "Family Members",
      description: "Personal emergency contacts and family members"
    },
    {
      name: "Disaster Response Teams",
      description: "Specialized disaster response and relief organizations"
    }
  ];

  useEffect(() => {
    // Get user role from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(userData?.role || 'student');

    // Check for emergency mode in localStorage
    const emergencyMode = localStorage.getItem('emergency-mode') === 'true';
    setIsEmergencyMode(emergencyMode);
  }, []);

  const handleEmergencyToggle = () => {
    const newEmergencyMode = !isEmergencyMode;
    setIsEmergencyMode(newEmergencyMode);
    localStorage.setItem('emergency-mode', newEmergencyMode?.toString());
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('emergency-mode-toggle', {
      detail: { active: newEmergencyMode }
    }));
  };

  const handleCategoryToggle = (categoryName) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryName]: !prev?.[categoryName]
    }));
  };

  const handleCall = (contact) => {
    console.log('Calling:', contact?.name, contact?.phone);
    // In a real app, this would integrate with phone capabilities
  };

  const handleMessage = (contact) => {
    console.log('Messaging:', contact?.name, contact?.phone);
    // In a real app, this would open SMS app
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const handleAddContact = (categoryName) => {
    setSelectedCategory(categoryName);
    setEditingContact(null);
    setShowContactForm(true);
  };

  const handleSaveContact = (contactData) => {
    setContactsData(prev => {
      const category = contactData?.category;
      const updatedCategory = prev?.[category] || [];
      
      if (editingContact) {
        // Update existing contact
        const updatedContacts = updatedCategory?.map(contact =>
          contact?.id === editingContact?.id ? contactData : contact
        );
        return {
          ...prev,
          [category]: updatedContacts
        };
      } else {
        // Add new contact
        return {
          ...prev,
          [category]: [...updatedCategory, contactData]
        };
      }
    });
    
    setShowContactForm(false);
    setEditingContact(null);
    setSelectedCategory('');
  };

  const handleEmergencyBroadcast = (actionId) => {
    console.log('Emergency broadcast:', actionId);
    // In a real app, this would trigger emergency protocols
  };

  const handleMassNotification = () => {
    console.log('Mass notification triggered');
    // In a real app, this would send notifications to all contacts
  };

  const filteredCategories = categories?.filter(category => {
    if (!searchTerm) return true;
    
    const categoryContacts = contactsData?.[category?.name] || [];
    return categoryContacts?.some(contact =>
      contact?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      contact?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      contact?.phone?.includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Emergency Contacts - DisasterEd Pro</title>
        <meta name="description" content="Access critical emergency contacts and communication resources for disaster situations" />
      </Helmet>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail />
        
        <div className="space-y-8">
          {/* Emergency Header */}
          <EmergencyHeader 
            onEmergencyToggle={handleEmergencyToggle}
            isEmergencyActive={isEmergencyMode}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search Bar */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-card">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search contacts by name, role, or phone number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Categories */}
              <div className="space-y-6">
                {filteredCategories?.map((category) => (
                  <ContactCategory
                    key={category?.name}
                    category={category}
                    contacts={contactsData?.[category?.name] || []}
                    onCall={handleCall}
                    onMessage={handleMessage}
                    onEdit={handleEditContact}
                    onAddContact={handleAddContact}
                    isCollapsed={collapsedCategories?.[category?.name]}
                    onToggle={() => handleCategoryToggle(category?.name)}
                  />
                ))}
              </div>

              {/* No Results */}
              {searchTerm && filteredCategories?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No contacts found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    No contacts match your search criteria "{searchTerm}"
                  </p>
                  <Button
                    variant="outline"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <QuickActionPanel
                onEmergencyBroadcast={handleEmergencyBroadcast}
                onMassNotification={handleMassNotification}
                userRole={userRole}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Contact Form Modal */}
      <ContactForm
        contact={editingContact}
        category={selectedCategory}
        onSave={handleSaveContact}
        onCancel={() => {
          setShowContactForm(false);
          setEditingContact(null);
          setSelectedCategory('');
        }}
        isVisible={showContactForm}
      />
    </div>
  );
};

export default EmergencyContacts;
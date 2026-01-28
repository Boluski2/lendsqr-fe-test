import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, User as UserIcon } from 'lucide-react';
import { fetchUserById, getUserFromLocalStorage, saveUserToLocalStorage, updateUserStatus } from '@/services/mockApi';
import { User } from '@/types/user';
import '../styles/pages/UserDetails.scss';

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

const tabs: { id: TabType; label: string }[] = [
  { id: 'general', label: 'General Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'bank', label: 'Bank Details' },
  { id: 'loans', label: 'Loans' },
  { id: 'savings', label: 'Savings' },
  { id: 'app', label: 'App and System' },
];

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('general');

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setError('User ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First check localStorage
        const cachedUser = getUserFromLocalStorage(userId);
        if (cachedUser) {
          setUser(cachedUser);
          setLoading(false);
          return;
        }

        // Fetch from API
        const userData = await fetchUserById(userId);
        if (userData) {
          // Save to localStorage
          saveUserToLocalStorage(userData);
          setUser(userData);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleBlacklistUser = async () => {
    if (!user) return;
    await updateUserStatus(user.id, 'Blacklisted');
    setUser({ ...user, status: 'Blacklisted' });
    saveUserToLocalStorage({ ...user, status: 'Blacklisted' });
  };

  const handleActivateUser = async () => {
    if (!user) return;
    await updateUserStatus(user.id, 'Active');
    setUser({ ...user, status: 'Active' });
    saveUserToLocalStorage({ ...user, status: 'Active' });
  };

  const renderStars = (tier: number) => {
    return [1, 2, 3].map((star) => (
      <Star key={star} className={star <= tier ? 'filled' : 'empty'} />
    ));
  };

  if (loading) {
    return (
      <div className="user-details">
        <Link to="/dashboard/users" className="user-details__back">
          <ArrowLeft />
          Back to Users
        </Link>
        <div className="user-details__loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-details">
        <Link to="/dashboard/users" className="user-details__back">
          <ArrowLeft />
          Back to Users
        </Link>
        <div className="user-details__error">
          <p>{error || 'User not found'}</p>
          <Link to="/dashboard/users">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details">
      <Link to="/dashboard/users" className="user-details__back">
        <ArrowLeft />
        Back to Users
      </Link>
      
      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        <div className="user-details__actions">
          <button 
            className="user-details__btn user-details__btn--danger"
            onClick={handleBlacklistUser}
          >
            Blacklist User
          </button>
          <button 
            className="user-details__btn user-details__btn--primary"
            onClick={handleActivateUser}
          >
            Activate User
          </button>
        </div>
      </div>
      
      <div className="user-details__profile-card">
        <div className="user-details__profile-header">
          <div className="user-details__avatar">
            <UserIcon />
          </div>
          
          <div className="user-details__profile-info">
            <h2 className="user-details__name">{user.personalInfo.fullName}</h2>
            <p className="user-details__id">{user.id}</p>
          </div>
          
          <div className="user-details__tier">
            <p className="user-details__tier-label">User's Tier</p>
            <div className="user-details__tier-stars">
              {renderStars(user.tier)}
            </div>
          </div>
          
          <div className="user-details__balance">
            <p className="user-details__balance-amount">{user.accountBalance}</p>
            <p className="user-details__balance-account">{user.accountNumber}/{user.bankName}</p>
          </div>
        </div>
        
        <div className="user-details__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`user-details__tab ${activeTab === tab.id ? 'user-details__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="user-details__content">
        {activeTab === 'general' && (
          <>
            <div className="user-details__section">
              <h3 className="user-details__section-title">Personal Information</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <p className="user-details__field-label">Full Name</p>
                  <p className="user-details__field-value">{user.personalInfo.fullName}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Phone Number</p>
                  <p className="user-details__field-value">{user.personalInfo.phoneNumber}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Email Address</p>
                  <p className="user-details__field-value">{user.personalInfo.emailAddress}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">BVN</p>
                  <p className="user-details__field-value">{user.personalInfo.bvn}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Gender</p>
                  <p className="user-details__field-value">{user.personalInfo.gender}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Marital Status</p>
                  <p className="user-details__field-value">{user.personalInfo.maritalStatus}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Children</p>
                  <p className="user-details__field-value">{user.personalInfo.children}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Type of Residence</p>
                  <p className="user-details__field-value">{user.personalInfo.typeOfResidence}</p>
                </div>
              </div>
            </div>
            
            <div className="user-details__section">
              <h3 className="user-details__section-title">Education and Employment</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <p className="user-details__field-label">Level of Education</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.levelOfEducation}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Employment Status</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.employmentStatus}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Sector of Employment</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.sectorOfEmployment}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Duration of Employment</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.durationOfEmployment}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Office Email</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.officeEmail}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Monthly Income</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.monthlyIncome}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Loan Repayment</p>
                  <p className="user-details__field-value">{user.educationAndEmployment.loanRepayment}</p>
                </div>
              </div>
            </div>
            
            <div className="user-details__section">
              <h3 className="user-details__section-title">Socials</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <p className="user-details__field-label">Twitter</p>
                  <p className="user-details__field-value">{user.socials.twitter}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Facebook</p>
                  <p className="user-details__field-value">{user.socials.facebook}</p>
                </div>
                <div className="user-details__field">
                  <p className="user-details__field-label">Instagram</p>
                  <p className="user-details__field-value">{user.socials.instagram}</p>
                </div>
              </div>
            </div>
            
            <div className="user-details__section">
              <h3 className="user-details__section-title">Guarantor</h3>
              {user.guarantors.map((guarantor, index) => (
                <div key={index} className="user-details__guarantor">
                  <div className="user-details__field">
                    <p className="user-details__field-label">Full Name</p>
                    <p className="user-details__field-value">{guarantor.fullName}</p>
                  </div>
                  <div className="user-details__field">
                    <p className="user-details__field-label">Phone Number</p>
                    <p className="user-details__field-value">{guarantor.phoneNumber}</p>
                  </div>
                  <div className="user-details__field">
                    <p className="user-details__field-label">Email Address</p>
                    <p className="user-details__field-value">{guarantor.emailAddress}</p>
                  </div>
                  <div className="user-details__field">
                    <p className="user-details__field-label">Relationship</p>
                    <p className="user-details__field-value">{guarantor.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeTab !== 'general' && (
          <div className="user-details__section">
            <p style={{ textAlign: 'center', color: '#545F7D', padding: '60px 0' }}>
              {tabs.find(t => t.id === activeTab)?.label} content coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

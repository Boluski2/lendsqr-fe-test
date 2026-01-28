import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Sidebar.scss';
import { 
  Briefcase, 
  Users, 
  Home, 
  UserCheck, 
  DollarSign,
  PiggyBank,
  Handshake,
  UserX,
  Database,
  CreditCard,
  BarChart,
  FileText,
  Settings,
  Scroll,
  Shield,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', icon: <Home />, path: '/dashboard' },
    ]
  },
  {
    title: 'CUSTOMERS',
    items: [
      { label: 'Users', icon: <Users />, path: '/dashboard/users' },
      { label: 'Guarantors', icon: <UserCheck />, path: '/dashboard/guarantors' },
      { label: 'Loans', icon: <DollarSign />, path: '/dashboard/loans' },
      { label: 'Decision Models', icon: <Handshake />, path: '/dashboard/decision-models' },
      { label: 'Savings', icon: <PiggyBank />, path: '/dashboard/savings' },
      { label: 'Loan Requests', icon: <CreditCard />, path: '/dashboard/loan-requests' },
      { label: 'Whitelist', icon: <UserCheck />, path: '/dashboard/whitelist' },
      { label: 'Karma', icon: <UserX />, path: '/dashboard/karma' },
    ]
  },
  {
    title: 'BUSINESSES',
    items: [
      { label: 'Organization', icon: <Briefcase />, path: '/dashboard/organization' },
      { label: 'Loan Products', icon: <CreditCard />, path: '/dashboard/loan-products' },
      { label: 'Savings Products', icon: <Database />, path: '/dashboard/savings-products' },
      { label: 'Fees and Charges', icon: <DollarSign />, path: '/dashboard/fees' },
      { label: 'Transactions', icon: <BarChart />, path: '/dashboard/transactions' },
      { label: 'Services', icon: <Settings />, path: '/dashboard/services' },
      { label: 'Service Account', icon: <UserCheck />, path: '/dashboard/service-account' },
      { label: 'Settlements', icon: <Scroll />, path: '/dashboard/settlements' },
      { label: 'Reports', icon: <FileText />, path: '/dashboard/reports' },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Preferences', icon: <Settings />, path: '/dashboard/preferences' },
      { label: 'Fees and Pricing', icon: <Shield />, path: '/dashboard/pricing' },
      { label: 'Audit Logs', icon: <Scroll />, path: '/dashboard/audit-logs' },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('lendsqr_auth');
    window.location.href = '/';
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          <div className="sidebar__switch">
            <Briefcase />
            <span>Switch Organization</span>
            <ChevronDown />
          </div>
          
          {navSections.map((section, index) => (
            <div className="sidebar__section" key={index}>
              {section.title && (
                <div className="sidebar__section-title">{section.title}</div>
              )}
              <nav className="sidebar__nav">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar__item ${isActive(item.path) ? 'sidebar__item--active' : ''}`}
                    onClick={onClose}
                  >
                    {item.icon}
                    <span className="sidebar__item-text">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
          
          <div className="sidebar__logout">
            <button className="sidebar__item" onClick={handleLogout}>
              <LogOut />
              <span className="sidebar__item-text">Logout</span>
            </button>
            <div className="sidebar__version">v1.2.0</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

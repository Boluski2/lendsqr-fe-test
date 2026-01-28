import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersTable from './UsersTable';
import { User } from '@/types/user';

const mockUsers: User[] = [
  {
    id: 'LSQFf587g01',
    organization: 'Lendsqr',
    username: 'Grace123',
    email: 'grace@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: 'May 15, 2020, 10:00 AM',
    status: 'Active',
    personalInfo: {
      fullName: 'Grace Effiom',
      phoneNumber: '08078903721',
      emailAddress: 'grace@gmail.com',
      bvn: '12345678901',
      gender: 'Female',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: "Parent's Apartment",
    },
    educationAndEmployment: {
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'grace@lendsqr.com',
      monthlyIncome: '₦200,000.00 - ₦400,000.00',
      loanRepayment: '40,000',
    },
    socials: {
      twitter: '@grace_effiom',
      facebook: 'Grace Effiom',
      instagram: '@grace_effiom',
    },
    guarantors: [],
    accountBalance: '₦200,000.00',
    accountNumber: '9912345678',
    bankName: 'Providus Bank',
    tier: 2,
  },
  {
    id: 'LSQFf587g02',
    organization: 'Irorun',
    username: 'Tosin456',
    email: 'tosin@irorun.com',
    phoneNumber: '08160780928',
    dateJoined: 'Apr 30, 2020, 10:00 AM',
    status: 'Pending',
    personalInfo: {
      fullName: 'Tosin Dokunmu',
      phoneNumber: '08160780928',
      emailAddress: 'tosin@gmail.com',
      bvn: '12345678902',
      gender: 'Male',
      maritalStatus: 'Married',
      children: '2',
      typeOfResidence: 'Owned',
    },
    educationAndEmployment: {
      levelOfEducation: 'M.Sc',
      employmentStatus: 'Self-employed',
      sectorOfEmployment: 'Technology',
      durationOfEmployment: '5 years',
      officeEmail: 'tosin@irorun.com',
      monthlyIncome: '₦400,000.00 - ₦600,000.00',
      loanRepayment: '80,000',
    },
    socials: {
      twitter: '@tosin_dokunmu',
      facebook: 'Tosin Dokunmu',
      instagram: '@tosin_dokunmu',
    },
    guarantors: [],
    accountBalance: '₦350,000.00',
    accountNumber: '9912345679',
    bankName: 'GTBank',
    tier: 3,
  },
];

const mockOnFilterClick = vi.fn();

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('UsersTable Component', () => {
  it('should render table headers correctly', () => {
    renderWithRouter(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);
    
    expect(screen.getByText('ORGANIZATION')).toBeInTheDocument();
    expect(screen.getByText('USERNAME')).toBeInTheDocument();
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument();
    expect(screen.getByText('DATE JOINED')).toBeInTheDocument();
    expect(screen.getByText('STATUS')).toBeInTheDocument();
  });

  it('should render user data correctly', () => {
    renderWithRouter(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);
    
    expect(screen.getByText('Lendsqr')).toBeInTheDocument();
    expect(screen.getByText('Grace123')).toBeInTheDocument();
    expect(screen.getByText('grace@lendsqr.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should display correct status badges', () => {
    renderWithRouter(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);
    
    const activeStatus = screen.getByText('Active');
    const pendingStatus = screen.getByText('Pending');
    
    expect(activeStatus).toHaveClass('status-badge--active');
    expect(pendingStatus).toHaveClass('status-badge--pending');
  });

  it('should call onFilterClick when filter icon is clicked', () => {
    renderWithRouter(<UsersTable users={mockUsers} onFilterClick={mockOnFilterClick} />);
    
    const orgHeader = screen.getByText('ORGANIZATION');
    fireEvent.click(orgHeader);
    
    expect(mockOnFilterClick).toHaveBeenCalled();
  });

  it('should render empty table when no users', () => {
    renderWithRouter(<UsersTable users={[]} onFilterClick={mockOnFilterClick} />);
    
    // Table structure should still exist
    expect(screen.getByText('ORGANIZATION')).toBeInTheDocument();
    // But no user data rows
    expect(screen.queryByText('Lendsqr')).not.toBeInTheDocument();
  });
});

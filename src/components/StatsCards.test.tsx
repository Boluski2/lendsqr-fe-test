import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsCards from './StatsCards';
import { UsersStats } from '@/types/user';

const mockStats: UsersStats = {
  totalUsers: 2453,
  activeUsers: 2453,
  usersWithLoans: 12453,
  usersWithSavings: 102453,
};

describe('StatsCards Component', () => {
  it('should render all four stat cards', () => {
    render(<StatsCards stats={mockStats} />);
    
    expect(screen.getByText('USERS')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
  });

  it('should display formatted stat values', () => {
    render(<StatsCards stats={mockStats} />);
    
    // Use getAllByText since totalUsers and activeUsers have the same value
    const values2453 = screen.getAllByText('2,453');
    expect(values2453).toHaveLength(2); // USERS and ACTIVE USERS
    expect(screen.getByText('12,453')).toBeInTheDocument();
    expect(screen.getByText('102,453')).toBeInTheDocument();
  });

  it('should handle zero values correctly', () => {
    const zeroStats: UsersStats = {
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0,
    };
    
    render(<StatsCards stats={zeroStats} />);
    
    const zeroElements = screen.getAllByText('0');
    expect(zeroElements).toHaveLength(4);
  });
});

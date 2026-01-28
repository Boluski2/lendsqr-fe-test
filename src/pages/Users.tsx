import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchUsers, fetchUsersStats } from '@/services/mockApi';
import { User, UsersStats, FilterOptions } from '@/types/user';
import StatsCards from '@/components/StatsCards';
import UsersTable from '@/components/UsersTable';
import Pagination from '@/components/Pagination';
import FilterDropdown from '@/components/FilterDropdown';
import '../styles/pages/Users.scss';

const initialFilters: FilterOptions = {
  organization: '',
  username: '',
  email: '',
  date: '',
  phoneNumber: '',
  status: '',
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UsersStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>(initialFilters);
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, statsData] = await Promise.all([
          fetchUsers(),
          fetchUsersStats(),
        ]);
        setUsers(usersData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const organizations = useMemo(() => {
    return [...new Set(users.map(u => u.organization))];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (appliedFilters.organization && user.organization !== appliedFilters.organization) return false;
      if (appliedFilters.username && !user.username.toLowerCase().includes(appliedFilters.username.toLowerCase())) return false;
      if (appliedFilters.email && !user.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) return false;
      if (appliedFilters.phoneNumber && !user.phoneNumber.includes(appliedFilters.phoneNumber)) return false;
      if (appliedFilters.status && user.status !== appliedFilters.status) return false;
      return true;
    });
  }, [users, appliedFilters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilter = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="users-page">
        <h1 className="users-page__title">Users</h1>
        <div className="users-page__loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-page">
        <h1 className="users-page__title">Users</h1>
        <div className="users-page__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-page__header">
        <h1 className="users-page__title">Users</h1>
      </div>
      
      {stats && <StatsCards stats={stats} />}
      
      <div className="users-page__table-container">
        <div className="filter-container" ref={filterRef}>
          {showFilter && (
            <FilterDropdown
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              onFilter={handleFilter}
              organizations={organizations}
            />
          )}
        </div>
        
        <UsersTable 
          users={paginatedUsers} 
          onFilterClick={handleFilterClick}
        />
        
        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Users;

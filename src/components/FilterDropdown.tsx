import React from 'react';
import { FilterOptions } from '@/types/user';
import '../styles/components/FilterDropdown.scss';

interface FilterDropdownProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onReset: () => void;
  onFilter: () => void;
  organizations: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  onChange,
  onReset,
  onFilter,
  organizations,
}) => {
  const handleChange = (field: keyof FilterOptions, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Organization</label>
        <select
          className="filter-dropdown__select"
          value={filters.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
        >
          <option value="">Select</option>
          {organizations.map((org) => (
            <option key={org} value={org}>{org}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Username</label>
        <input
          type="text"
          className="filter-dropdown__input"
          placeholder="User"
          value={filters.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
      </div>
      
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Email</label>
        <input
          type="email"
          className="filter-dropdown__input"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Date</label>
        <input
          type="date"
          className="filter-dropdown__input"
          placeholder="Date"
          value={filters.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
      </div>
      
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Phone Number</label>
        <input
          type="tel"
          className="filter-dropdown__input"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
        />
      </div>
      
      <div className="filter-dropdown__field">
        <label className="filter-dropdown__label">Status</label>
        <select
          className="filter-dropdown__select"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>
      
      <div className="filter-dropdown__actions">
        <button className="filter-dropdown__btn filter-dropdown__btn--reset" onClick={onReset}>
          Reset
        </button>
        <button className="filter-dropdown__btn filter-dropdown__btn--filter" onClick={onFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;

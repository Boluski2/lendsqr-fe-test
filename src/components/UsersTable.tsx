import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Filter, Eye, UserX, UserCheck } from 'lucide-react';
import { User, UserStatus } from '@/types/user';
import '../styles/components/UsersTable.scss';

interface UsersTableProps {
  users: User[];
  onFilterClick: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onFilterClick }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/dashboard/users/${userId}`);
    setOpenMenuId(null);
  };

  const getStatusClass = (status: UserStatus): string => {
    return status.toLowerCase();
  };

  const columns = [
    { key: 'organization', label: 'ORGANIZATION' },
    { key: 'username', label: 'USERNAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phoneNumber', label: 'PHONE NUMBER' },
    { key: 'dateJoined', label: 'DATE JOINED' },
    { key: 'status', label: 'STATUS' },
  ];

  return (
    <div className="users-table">
      <div className="users-table__wrapper">
        <table className="users-table__table">
          <thead className="users-table__header">
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  <div className="users-table__header-content" onClick={onFilterClick}>
                    {col.label}
                    <Filter />
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="users-table__body">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status-badge status-badge--${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="users-table__actions" ref={openMenuId === user.id ? menuRef : null}>
                  <button
                    className="users-table__actions-btn"
                    onClick={() => toggleMenu(user.id)}
                    aria-label="Actions"
                  >
                    <MoreVertical />
                  </button>
                  {openMenuId === user.id && (
                    <div className="users-table__actions-menu">
                      <button
                        className="users-table__action-item"
                        onClick={() => handleViewDetails(user.id)}
                      >
                        <Eye />
                        View Details
                      </button>
                      <button className="users-table__action-item">
                        <UserX />
                        Blacklist User
                      </button>
                      <button className="users-table__action-item">
                        <UserCheck />
                        Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

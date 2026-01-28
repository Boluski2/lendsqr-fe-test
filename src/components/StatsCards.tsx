import React from 'react';
import { UsersStats } from '@/types/user';
import '../styles/components/StatsCards.scss';

interface StatsCardsProps {
  stats: UsersStats;
}

// Custom icon components to match Figma design exactly
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 19V17C1 14.7909 2.79086 13 5 13H11C13.2091 13 15 14.7909 15 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 3C16.3807 3 17.5 4.11929 17.5 5.5C17.5 6.88071 16.3807 8 15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13H19C20.6569 13 22 14.3431 22 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ActiveUsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 19V17C1 14.7909 2.79086 13 5 13H11C13.2091 13 15 14.7909 15 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 3C16.3807 3 17.5 4.11929 17.5 5.5C17.5 6.88071 16.3807 8 15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 13H19C20.6569 13 22 14.3431 22 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersWithLoansIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersWithSavingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 9H11C11.5523 9 12 9.44772 12 10C12 10.5523 11.5523 11 11 11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'USERS',
      value: stats.totalUsers.toLocaleString(),
      icon: <UsersIcon />,
      color: 'pink' as const,
    },
    {
      title: 'ACTIVE USERS',
      value: stats.activeUsers.toLocaleString(),
      icon: <ActiveUsersIcon />,
      color: 'purple' as const,
    },
    {
      title: 'USERS WITH LOANS',
      value: stats.usersWithLoans.toLocaleString(),
      icon: <UsersWithLoansIcon />,
      color: 'orange' as const,
    },
    {
      title: 'USERS WITH SAVINGS',
      value: stats.usersWithSavings.toLocaleString(),
      icon: <UsersWithSavingsIcon />,
      color: 'red' as const,
    },
  ];

  return (
    <div className="stats-cards">
      {cards.map((card) => (
        <div key={card.title} className="stats-card">
          <div className={`stats-card__icon stats-card__icon--${card.color}`}>
            {card.icon}
          </div>
          <div className="stats-card__title">{card.title}</div>
          <div className="stats-card__value">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

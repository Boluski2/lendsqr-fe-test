import { describe, it, expect } from 'vitest';
import { generateUsers, fetchUsers, fetchUserById, fetchUsersStats } from './mockApi';

describe('Mock API Service', () => {
  describe('generateUsers', () => {
    it('should generate 500 users', () => {
      const users = generateUsers();
      expect(users).toHaveLength(500);
    });

    it('should generate users with all required fields', () => {
      const users = generateUsers();
      const user = users[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('organization');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('phoneNumber');
      expect(user).toHaveProperty('dateJoined');
      expect(user).toHaveProperty('status');
      expect(user).toHaveProperty('personalInfo');
      expect(user).toHaveProperty('educationAndEmployment');
      expect(user).toHaveProperty('socials');
      expect(user).toHaveProperty('guarantors');
    });

    it('should generate users with valid statuses', () => {
      const users = generateUsers();
      const validStatuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
      
      users.forEach(user => {
        expect(validStatuses).toContain(user.status);
      });
    });

    it('should generate users with valid tiers (1-3)', () => {
      const users = generateUsers();
      
      users.forEach(user => {
        expect([1, 2, 3]).toContain(user.tier);
      });
    });

    it('should cache users on subsequent calls', () => {
      const users1 = generateUsers();
      const users2 = generateUsers();
      
      expect(users1).toBe(users2);
    });
  });

  describe('fetchUsers', () => {
    it('should return all users', async () => {
      const users = await fetchUsers();
      expect(users).toHaveLength(500);
    });
  });

  describe('fetchUserById', () => {
    it('should return a user by id', async () => {
      const users = generateUsers();
      const firstUser = users[0];
      
      const fetchedUser = await fetchUserById(firstUser.id);
      expect(fetchedUser).toBeDefined();
      expect(fetchedUser?.id).toBe(firstUser.id);
    });

    it('should return undefined for non-existent user', async () => {
      const user = await fetchUserById('non-existent-id');
      expect(user).toBeUndefined();
    });
  });

  describe('fetchUsersStats', () => {
    it('should return correct stats structure', async () => {
      const stats = await fetchUsersStats();
      
      expect(stats).toHaveProperty('totalUsers');
      expect(stats).toHaveProperty('activeUsers');
      expect(stats).toHaveProperty('usersWithLoans');
      expect(stats).toHaveProperty('usersWithSavings');
    });

    it('should return totalUsers equal to generated users count', async () => {
      const stats = await fetchUsersStats();
      const users = generateUsers();
      
      expect(stats.totalUsers).toBe(users.length);
    });

    it('should have activeUsers less than or equal to totalUsers', async () => {
      const stats = await fetchUsersStats();
      expect(stats.activeUsers).toBeLessThanOrEqual(stats.totalUsers);
    });
  });
});

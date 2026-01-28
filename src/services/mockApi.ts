// Mock API service for Lendsqr
import { User, UsersStats, UserStatus } from '@/types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Quickloan', 'Cashbox'];
const firstNames = ['Grace', 'Tosin', 'Debby', 'Adedeji', 'Chioma', 'Oluwaseun', 'Emeka', 'Funke', 'Babatunde', 'Ngozi', 'Ifeanyi', 'Yemi', 'Adaeze', 'Kunle', 'Tola'];
const lastNames = ['Effiom', 'Dokunmu', 'Ogana', 'Williams', 'Okonkwo', 'Adeyemi', 'Nnamdi', 'Adeleke', 'Ibrahim', 'Chukwu', 'Olayinka', 'Bankole', 'Obi', 'Fashola', 'Bakare'];
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const educationLevels = ['B.Sc', 'M.Sc', 'Ph.D', 'HND', 'OND', 'SSCE'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed', 'Student', 'Retired'];
const sectors = ['FinTech', 'Banking', 'Technology', 'Healthcare', 'Education', 'Agriculture', 'Oil & Gas', 'Telecommunications'];
const residenceTypes = ["Parent's Apartment", 'Rented', 'Owned', 'Company Provided'];
const relationships = ['Sister', 'Brother', 'Friend', 'Colleague', 'Spouse', 'Parent', 'Child'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];

// Generate random data helpers
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const randomPhone = (): string => `0${randomNumber(70, 90)}${randomNumber(10000000, 99999999)}`;
const randomDate = (): string => {
  const start = new Date(2019, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};
const randomBVN = (): string => String(randomNumber(10000000000, 99999999999));
const randomAccountNumber = (): string => String(randomNumber(1000000000, 9999999999));

const generateGuarantor = (): { fullName: string; phoneNumber: string; emailAddress: string; relationship: string } => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  return {
    fullName: `${firstName} ${lastName}`,
    phoneNumber: randomPhone(),
    emailAddress: `${firstName.toLowerCase()}@gmail.com`,
    relationship: randomItem(relationships),
  };
};

const generateUser = (id: number): User => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const organization = randomItem(organizations);
  const username = `${firstName}${randomNumber(1, 999)}`;
  
  return {
    id: `LSQFf587g${id.toString().padStart(2, '0')}`,
    organization,
    username,
    email: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
    phoneNumber: randomPhone(),
    dateJoined: randomDate(),
    status: randomItem(statuses),
    personalInfo: {
      fullName: `${firstName} ${lastName}`,
      phoneNumber: randomPhone(),
      emailAddress: `${firstName.toLowerCase()}@gmail.com`,
      bvn: randomBVN(),
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      maritalStatus: randomItem(maritalStatuses),
      children: Math.random() > 0.5 ? 'None' : String(randomNumber(1, 4)),
      typeOfResidence: randomItem(residenceTypes),
    },
    educationAndEmployment: {
      levelOfEducation: randomItem(educationLevels),
      employmentStatus: randomItem(employmentStatuses),
      sectorOfEmployment: randomItem(sectors),
      durationOfEmployment: `${randomNumber(1, 10)} years`,
      officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
      monthlyIncome: `₦${randomNumber(100, 400).toLocaleString()},000.00 - ₦${randomNumber(400, 900).toLocaleString()},000.00`,
      loanRepayment: `${randomNumber(10, 100).toLocaleString()},000`,
    },
    socials: {
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    },
    guarantors: [generateGuarantor(), generateGuarantor()],
    accountBalance: `₦${randomNumber(50, 500).toLocaleString()},000.00`,
    accountNumber: randomAccountNumber(),
    bankName: `${randomItem(['Providus', 'GTBank', 'First Bank', 'Access', 'UBA'])} Bank`,
    tier: randomItem([1, 2, 3]) as 1 | 2 | 3,
  };
};

// Generate 500 users
let cachedUsers: User[] | null = null;

export const generateUsers = (): User[] => {
  if (cachedUsers) return cachedUsers;
  
  cachedUsers = Array.from({ length: 500 }, (_, i) => generateUser(i + 1));
  return cachedUsers;
};

export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateUsers();
};

export const fetchUserById = async (id: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const users = generateUsers();
  return users.find(user => user.id === id);
};

export const fetchUsersStats = async (): Promise<UsersStats> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const users = generateUsers();
  
  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    usersWithLoans: Math.floor(users.length * 0.25),
    usersWithSavings: Math.floor(users.length * 0.4),
  };
};

// LocalStorage helpers for user details
export const saveUserToLocalStorage = (user: User): void => {
  const storedUsers = localStorage.getItem('lendsqr_users');
  const users: Record<string, User> = storedUsers ? JSON.parse(storedUsers) : {};
  users[user.id] = user;
  localStorage.setItem('lendsqr_users', JSON.stringify(users));
};

export const getUserFromLocalStorage = (id: string): User | null => {
  const storedUsers = localStorage.getItem('lendsqr_users');
  if (!storedUsers) return null;
  
  const users: Record<string, User> = JSON.parse(storedUsers);
  return users[id] || null;
};

export const updateUserStatus = async (userId: string, status: UserStatus): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const users = generateUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].status = status;
    saveUserToLocalStorage(users[userIndex]);
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: Exclude<UserRole, 'admin'>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  role: UserRole | null;
  isTraveler: boolean;
  isVendor: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Normalize and seed users with roles in localStorage
    const rawUsers = localStorage.getItem('holidayapp_users');
    let users: any[] = rawUsers ? JSON.parse(rawUsers) : [];

    users = users.map((u) => ({
      ...u,
      role: (u.role as UserRole) ?? 'traveler',
      wishlist: u.wishlist ?? [],
      bookings: u.bookings ?? [],
    }));

    // Seed default admin and vendor accounts if they don't exist
    if (!users.some((u) => u.role === 'admin')) {
      users.push({
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@holidayapp.com',
        password: 'admin123',
        role: 'admin' as UserRole,
        wishlist: [],
        bookings: [],
      });
    }

    if (!users.some((u) => u.role === 'vendor')) {
      users.push({
        id: 'vendor-1',
        name: 'Demo Vendor',
        email: 'vendor@holidayapp.com',
        password: 'vendor123',
        role: 'vendor' as UserRole,
        wishlist: [],
        bookings: [],
      });
    }

    localStorage.setItem('holidayapp_users', JSON.stringify(users));

    const storedUser = localStorage.getItem('holidayapp_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const normalized: User = {
        ...parsed,
        role: (parsed.role as UserRole) ?? 'traveler',
        wishlist: parsed.wishlist ?? [],
        bookings: parsed.bookings ?? [],
      };
      setUser(normalized);
      localStorage.setItem('holidayapp_user', JSON.stringify(normalized));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const rawUsers = JSON.parse(localStorage.getItem('holidayapp_users') || '[]');
    const users = rawUsers.map((u: any) => ({
      ...u,
      role: (u.role as UserRole) ?? 'traveler',
      wishlist: u.wishlist ?? [],
      bookings: u.bookings ?? [],
    }));

    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('holidayapp_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: Exclude<UserRole, 'admin'>,
  ): Promise<boolean> => {
    const rawUsers = JSON.parse(localStorage.getItem('holidayapp_users') || '[]');
    const users = rawUsers.map((u: any) => ({
      ...u,
      role: (u.role as UserRole) ?? 'traveler',
      wishlist: u.wishlist ?? [],
      bookings: u.bookings ?? [],
    }));
    
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      wishlist: [],
      bookings: [],
    };

    users.push({ ...newUser, password });
    localStorage.setItem('holidayapp_users', JSON.stringify(users));
    localStorage.setItem('holidayapp_user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('holidayapp_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        role: user?.role ?? null,
        isTraveler: user?.role === 'traveler',
        isVendor: user?.role === 'vendor',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

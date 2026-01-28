import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Page', () => {
  it('should render login form', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('should render forgot password link', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  it('should toggle password visibility', () => {
    renderWithRouter(<Login />);
    
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const toggleButton = screen.getByText('SHOW');
    
    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByText('HIDE')).toBeInTheDocument();
  });

  it('should update email field on input', () => {
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password field on input', () => {
    renderWithRouter(<Login />);
    
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  it('should render illustration image', () => {
    renderWithRouter(<Login />);
    
    const illustration = screen.getByAltText('Person with colorful geometric shapes illustration');
    expect(illustration).toBeInTheDocument();
  });
});

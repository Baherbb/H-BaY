import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';
import { MemoryRouter } from 'react-router-dom';

describe('SignUp Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });

  test('test rendering SignUp form with all fields and buttons works correct', () => {
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password Field/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password Field/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });
  
  test('test handling password visibility toggle', () => {
    const passwordInput = screen.getByLabelText(/Password Field/i);
    const toggleButton = screen.getByLabelText(/Toggle Password Visibility/i);
  
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
  test('test showing error when passwords do not match', () => {
    const passwordInput = screen.getByLabelText(/Password Field/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password Field/i);
  
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });
  
    expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
  });

  test('test rendering social login buttons', () => {
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Facebook/i })).toBeInTheDocument();
  });

  test('provides link to login page', () => {
    const loginLink = screen.getByRole('link', { name: /Log in/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});

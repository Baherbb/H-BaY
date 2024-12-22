import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
  const defaultUser = {
    name: 'Hossam Amir',
    email: 'hossam@example.com',
    phone: '01032426035',
    address: 'Giza',
    profilePicture: 'https://via.placeholder.com/100',
  };

  beforeEach(() => {
    render(<UserProfile />);
  });

 
  test(' test if rendering user profile with initial data works ', () => {
    expect(screen.getByRole('heading', { name: /My Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: defaultUser.name })).toBeInTheDocument();
    expect(screen.getByTestId('user-email')).toHaveTextContent(defaultUser.email);
    expect(screen.getByText(defaultUser.phone)).toBeInTheDocument();
    expect(screen.getByText(defaultUser.address)).toBeInTheDocument();

    const profileImage = screen.getByAltText('Profile') as HTMLImageElement;
    expect(profileImage.src).toBe(defaultUser.profilePicture);
  });

  test('test of edit mode opens when Edit Profile button is clicked', async () => {
    const editButton = screen.getByText('Edit Profile');
    await userEvent.click(editButton);
 
    expect(screen.getByDisplayValue(defaultUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(defaultUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(defaultUser.phone)).toBeInTheDocument();
    expect(screen.getByDisplayValue(defaultUser.address)).toBeInTheDocument();

  
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('test if we updates user information when edited and saved works correct', async () => {
    await userEvent.click(screen.getByText('Edit Profile'));
    const nameInput = screen.getByDisplayValue(defaultUser.name);
    const emailInput = screen.getByTestId('input-email');

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'New Name');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'new@email.com');

    await userEvent.click(screen.getByText('Save'));


    expect(screen.getByRole('heading', { name: /New Name/i })).toBeInTheDocument();
    expect(screen.getByTestId('user-email')).toHaveTextContent('new@email.com');
  });

 
  test('test if we cancels edits when Cancel button is clicked works correct', async () => {
    await userEvent.click(screen.getByText('Edit Profile'));
    const nameInput = screen.getByDisplayValue(defaultUser.name);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Temporary Name');
    await userEvent.click(screen.getByText('Cancel'));
    expect(screen.getByRole('heading', { name: /Hossam Amir/i })).toBeInTheDocument();
  });


  test(' checks and renders the  proper attributes like heading are accessable ', () => {
    expect(screen.getByRole('heading', { name: /My Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile' })).toBeInTheDocument();
    ['Name', 'Email', 'Phone', 'Address'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});

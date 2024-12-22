import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
test('check is sign in page compnets are rendered correctly', () => {
  render(
    <MemoryRouter initialEntries={['/signin']}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </MemoryRouter>
  );

 
  expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

  const signInButton = screen.getByRole('button', { name: /Sign In/i });
  expect(signInButton).toBeInTheDocument();
  
  expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
  expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
});






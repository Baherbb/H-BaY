import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeOrderPage from './OrdersDlevery';

describe('EmployeeOrderPage Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('test if rendering the component with initial orders works', () => {
    render(<EmployeeOrderPage />);
    expect(screen.getByText(/Employee Order List/i)).toBeInTheDocument();
  });

  

  test(' test if accepting an order work', () => {
    render(<EmployeeOrderPage />);

    const viewDetailsButton = screen.getAllByText(/View Details/i)[0];
    fireEvent.click(viewDetailsButton);

    const acceptButton = screen.getByText(/Accept Order/i);
    fireEvent.click(acceptButton);

    expect(window.alert).toHaveBeenCalledWith('Order OD001 has been accepted!');
    expect(screen.queryByText(/Order Details/i)).not.toBeInTheDocument();

 
  });

  test('test if it does not show accept button for already accepted orders', () => {
    render(<EmployeeOrderPage />);

    const viewDetailsButton = screen.getAllByText(/View Details/i)[0];
    fireEvent.click(viewDetailsButton);

    const acceptButton = screen.getByText(/Accept Order/i);
    fireEvent.click(acceptButton);

    fireEvent.click(viewDetailsButton);
    expect(screen.queryByText(/Accept Order/i)).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import OrderHistory from './OrderHistory';

describe('OrderHistory Component', () => {
  test(' test if rendering the header and description works', () => {
    render(
      <BrowserRouter>
        <OrderHistory />
      </BrowserRouter>
    );

    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
    expect(screen.getByText(/Review your past orders/i)).toBeInTheDocument();
  });

  test('test if rendering orders if they exist and works good ', () => {
    render(
      <BrowserRouter>
        <OrderHistory />
      </BrowserRouter>
    );

    expect(screen.getByText(/Order #12345/i)).toBeInTheDocument();
    expect(screen.getByText(/Placed on January 20, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$120.00/i)).toBeInTheDocument();


    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/\$600.00/i)).toBeInTheDocument();
  });



  test(' test if rendering "View Details" button for each order', () => {
    render(
      <BrowserRouter>
        <OrderHistory />
      </BrowserRouter>
    );

    const buttons = screen.getAllByText(/View Details/i);
    expect(buttons).toHaveLength(2); 
  });
});

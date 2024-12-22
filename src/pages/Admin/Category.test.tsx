import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryPage from './Category';

describe('CategoryPage Component', () => {
  test('test if rendering the component with initial state works', () => {
    render(<CategoryPage />);
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Category/i })).toBeInTheDocument();
  });

  test('test if adding a new category works', () => {
    render(<CategoryPage />);

    const addCategoryButton = screen.getAllByRole('button', { name: /Add Category/i })[0];
    fireEvent.click(addCategoryButton);

    fireEvent.change(screen.getByPlaceholderText(/Category Name/i), { target: { value: 'New Category' } });
    fireEvent.change(screen.getByPlaceholderText(/Category Description/i), { target: { value: 'Description' } });

    const confirmAddButton = screen.getAllByRole('button', { name: /Add Category/i })[1];
    fireEvent.click(confirmAddButton);

    expect(screen.getByText(/New Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });

  test('test if editing an existing category works', () => {
    render(<CategoryPage />);

    const addCategoryButton = screen.getAllByRole('button', { name: /Add Category/i })[0];
    fireEvent.click(addCategoryButton);
    fireEvent.change(screen.getByPlaceholderText(/Category Name/i), { target: { value: 'Old Category' } });
    fireEvent.click(screen.getAllByRole('button', { name: /Add Category/i })[1]);

    const editButton = screen.getByRole('button', { name: /Edit Category/i });
    fireEvent.click(editButton);

    const editInput = screen.getByPlaceholderText(/Category Name/i);
    fireEvent.change(editInput, { target: { value: 'Updated Category' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(screen.getByText(/Updated Category/i)).toBeInTheDocument();
  });

  test('test if deleteing a new category works', () => {
    render(<CategoryPage />);

    const addCategoryButton = screen.getAllByRole('button', { name: /Add Category/i })[0];
    fireEvent.click(addCategoryButton);
    fireEvent.change(screen.getByPlaceholderText(/Category Name/i), { target: { value: 'To Be Deleted' } });
    fireEvent.click(screen.getAllByRole('button', { name: /Add Category/i })[1]);

    const deleteButton = screen.getByRole('button', { name: /Delete Category/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/To Be Deleted/i)).not.toBeInTheDocument();
  });
});

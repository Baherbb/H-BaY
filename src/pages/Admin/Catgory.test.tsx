import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryPage from "./Category";

describe("CategoryPage Component", () => {
  beforeEach(() => {
    render(<CategoryPage />);
  });

  test("renders correctly", () => {
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/add category/i)).toBeInTheDocument();
  });

  test("opens and closes 'Add Category' modal", () => {
    fireEvent.click(screen.getByText(/add category/i));
    expect(screen.getByText(/add new category/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText(/add new category/i)).not.toBeInTheDocument();
  });

  test("adds a new category", () => {
    fireEvent.click(screen.getByText(/add category/i));
    fireEvent.change(screen.getByPlaceholderText(/category name/i), { target: { value: "New Category" } });
    fireEvent.change(screen.getByPlaceholderText(/category description/i), { target: { value: "Test Description" } });
    fireEvent.click(screen.getByText(/add category/i));

    expect(screen.getByText("New Category")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("edits an existing category", () => {
    fireEvent.click(screen.getByText(/add category/i));
    fireEvent.change(screen.getByPlaceholderText(/category name/i), { target: { value: "Edit Me" } });
    fireEvent.change(screen.getByPlaceholderText(/category description/i), { target: { value: "Initial Description" } });
    fireEvent.click(screen.getByText(/add category/i));


    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText(/category name/i), { target: { value: "Edited Category" } });
    fireEvent.change(screen.getByPlaceholderText(/category description/i), { target: { value: "Updated Description" } });
    fireEvent.click(screen.getByText(/save/i));


    expect(screen.getByText("Edited Category")).toBeInTheDocument();
    expect(screen.getByText("Updated Description")).toBeInTheDocument();
  });

  test("deletes a category", () => {
 
    fireEvent.click(screen.getByText(/add category/i));
    fireEvent.change(screen.getByPlaceholderText(/category name/i), { target: { value: "To Be Deleted" } });
    fireEvent.click(screen.getByText(/add category/i));

    
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.queryByText("To Be Deleted")).not.toBeInTheDocument();
  });

  test("does not allow adding a category with an empty name", () => {
    fireEvent.click(screen.getByText(/add category/i));
    fireEvent.click(screen.getByText(/add category/i)); 


    expect(screen.getByText(/add new category/i)).toBeInTheDocument();
  });
});

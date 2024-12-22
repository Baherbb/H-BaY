import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Products from "./Products";
import "@testing-library/jest-dom";

describe("Products Component", () => {
    test("test if rendering product management page elemnts works", () => {
      render(<Products />);
      expect(screen.getByText("Product Management")).toBeInTheDocument();
    });
  
    test("test displaying  the default product", () => {
      render(<Products />);
      expect(screen.getByText("Lenovo Legion 6")).toBeInTheDocument();
    });
  
    test("test openinng  the modal form for adding a product", () => {
      render(<Products />);
      const addButton = screen.getByTestId("add-product-main-button");  
      fireEvent.click(addButton);
      expect(screen.getByTestId("add-product-modal-header")).toBeInTheDocument();
    });
  
   
    describe("Products Component", () => {
        test(" test if it allows adding a new product", () => {
          render(<Products />);
          const mainButton = screen.getByTestId("add-product-main-button");
          fireEvent.click(mainButton);
          fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Test Product" } });
          fireEvent.change(screen.getByPlaceholderText("Inventory"), { target: { value: 5 } });
          fireEvent.change(screen.getByPlaceholderText("Processor"), { target: { value: "Intel Core i5" } });
          fireEvent.change(screen.getByPlaceholderText("RAM"), { target: { value: "8GB" } });
          const modalAddButton = screen.getByTestId("add-product-modal-button");
          fireEvent.click(modalAddButton);

          expect(screen.getByText("Test Product")).toBeInTheDocument();
          expect(screen.getByText("5")).toBeInTheDocument();
        });
      });
    test(" test if filtering  products by category works", () => {
      render(<Products />);
      const categoryDropdown = screen.getByRole("combobox");
      fireEvent.change(categoryDropdown, { target: { value: "Laptops" } });
      expect(screen.getByText("Lenovo Legion 6")).toBeInTheDocument();
    });
  
    test("test openining the modal for editing a product", () => {
      render(<Products />);
      const editButton = screen.getAllByTitle("Edit")[0];
      fireEvent.click(editButton);
      expect(screen.getByTestId("add-product-modal-header")).toHaveTextContent("Edit Product");
    });
  
    test(" test if deletes a product", () => {
      render(<Products />);
      const deleteButton = screen.getAllByTitle("Delete")[0];
      fireEvent.click(deleteButton);
      expect(screen.queryByText("Lenovo Legion 6")).not.toBeInTheDocument();
    });
  });
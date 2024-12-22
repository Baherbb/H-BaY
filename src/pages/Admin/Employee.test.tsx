import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Employees from "./Employees";

describe("Employees Component", () => {
  beforeEach(() => {
    render(<Employees />);
  });

  test("test if rendering employee management table and add button works", () => {
    expect(screen.getByText(/Employee Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
    expect(screen.getByText(/Employees/i)).toBeInTheDocument();
  });

  test(" test if adding a new employee works", () => {
    fireEvent.click(screen.getByText(/Add Employee/i));   
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Hossam Amir" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "hossam@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Role/i), {
      target: { value: "Team Leader" },
    });

    fireEvent.click(screen.getByText(/Add Employee/i));
    expect(screen.getByText("Hossam Amir")).toBeInTheDocument();
    expect(screen.getByText("hossam@example.com")).toBeInTheDocument();
    expect(screen.getByText("Team Leader")).toBeInTheDocument();
  });

  test("test updateing  an existing employee works", () => {
    fireEvent.click(screen.getAllByText(/Edit/i)[0]);
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Hossam Updated" },
    });
    fireEvent.click(screen.getByText(/Update Employee/i));

    expect(screen.getByText("Hossam Updated")).toBeInTheDocument();
    expect(screen.queryByText("Hossam Abobakr")).not.toBeInTheDocument();
  });

  test("deletes an employee", () => {
    
    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    expect(screen.queryByText("Hossam Abobakr")).not.toBeInTheDocument();
  });
});

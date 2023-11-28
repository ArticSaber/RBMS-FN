import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/app/login/page";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  it("renders the login form", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("updates the form data on input change", () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Enter the User Id"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter the Password"), {
      target: { value: "12345678" },
    });
    expect(screen.getByPlaceholderText("Enter the User Id")).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByPlaceholderText("Enter the Password")).toHaveValue(
      "12345678"
    );
  });

  it("submits the form and redirects on successful login", async () => {
    const pushMock = jest.fn();
    require("next/router").useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter the User Id"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter the Password"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Login Success")).toBeInTheDocument();
      expect(pushMock).toHaveBeenCalledWith("/Dashboard");
    });
  });

  it("displays an error toast on failed login", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});

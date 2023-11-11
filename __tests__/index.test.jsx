import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page.jsx";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login Component", () => {
  test("renders the login form", () => {
    render(<Login />);

    // Check if the login form elements are present
    const emailInput = screen.getByLabelText("Email ID");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getAllByText("Login")[1];
    const text = screen.getByLabelText("hellos");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
  });

  test("submits the form with valid credentials", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("Email ID");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getAllByText("Login")[1];
    const text = screen.getByLabelText("hellos");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    fireEvent.click(submitButton);

    expect(text).toBeInTheDocument();
  });

  test("displays an error for invalid credentials", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("Email ID");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getAllByText("Login")[1];

    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(submitButton);

      
    expect(screen.queryByText("hellos")).not.toBeInTheDocument();
  });
});

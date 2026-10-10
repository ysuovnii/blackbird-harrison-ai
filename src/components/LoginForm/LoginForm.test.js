import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '.';

describe('LoginForm', () => {
  test('renders sign in page', () => {
    render(<LoginForm />);
    const signInText = screen.getByText('Sign in');
    expect(signInText).toBeInTheDocument();
  });

  test('shows validation message for an invalid email address', async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/password/i), 'ValidPass1!');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('shows validation message for a weak password', async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'short');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  test('submits successfully with valid credentials', async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'StrongPass1!');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Login Successful')).toBeInTheDocument();
  });
});

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
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email address/i), 'invalid-email');
    await user.type(screen.getByLabelText(/password/i), 'ValidPass1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  test('shows validation message for a weak password', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'short');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  test('submits successfully with valid credentials', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'StrongPass1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Login Successful')).toBeInTheDocument();
  });
});

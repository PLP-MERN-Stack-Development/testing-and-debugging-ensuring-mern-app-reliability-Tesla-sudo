import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

// eslint-disable-next-line no-undef
test('submits bug form successfully', async () => {
  axios.post.mockResolvedValue({ data: { _id: '123' } });

  const mockOnAdd = vi.fn();
  render(<BugForm onBugAdded={mockOnAdd} />);

  fireEvent.change(screen.getByPlaceholderText(/title/i), {
    target: { value: 'Critical Bug' }
  });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: 'App crashes on login' }
  });
  fireEvent.change(screen.getByPlaceholderText(/your name/i), {
    target: { value: 'Alice' }
  });

  fireEvent.click(screen.getByText(/report bug/i));

  await screen.findByText(/bug reported successfully/i);
  // eslint-disable-next-line no-undef
  expect(mockOnAdd).toHaveBeenCalled();
});

// eslint-disable-next-line no-undef
test('shows validation errors', async () => {
  render(<BugForm onBugAdded={() => {}} />);
  fireEvent.click(screen.getByText(/report bug/i));

  // eslint-disable-next-line no-undef
  expect(await screen.findAllByText(/.+/)).toHaveLength(3);
});
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

// eslint-disable-next-line no-undef
test('loads and displays bugs', async () => {
  axios.get.mockResolvedValue({
    data: [{ _id: '1', title: 'Test Bug', status: 'open', reportedBy: 'Me' }]
  });

  render(<App />);

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
  });
});

// eslint-disable-next-line no-undef
test('handles API failure gracefully', async () => {
  axios.get.mockRejectedValue(new Error('Network Error'));
  render(<App />);

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(screen.getByText(/bug tracker/i)).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import BugList from '../components/BugList';

// eslint-disable-next-line no-undef
test('shows empty message when no bugs', () => {
  render(<BugList bugs={[]} onUpdate={() => {}} />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test('renders list of bugs', () => {
  const bugs = [
    { _id: '1', title: 'Login fails', status: 'open', reportedBy: 'John' }
  ];
  render(<BugList bugs={bugs} onUpdate={() => {}} />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText('Login fails')).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/all reported bugs/i)).toBeInTheDocument();
});
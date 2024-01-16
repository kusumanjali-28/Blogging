import { render, screen } from '@testing-library/react';
import App from './App';

test('renders User Registration heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/User Registration/i);
  expect(headingElement).toBeInTheDocument();
});

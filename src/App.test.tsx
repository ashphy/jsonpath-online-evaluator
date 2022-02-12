import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JSONPath input form', () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/JSONPath/i);
  expect(linkElement).toBeInTheDocument();
});

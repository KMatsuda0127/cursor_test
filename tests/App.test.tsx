import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('renders without crashing and displays updated title', () => {
    render(<App />);
    expect(
      screen.getByText('Chrome extension!!!!!!!!!!!!!!!!!!!')
    ).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    render(<App />);
    expect(
      screen.getByText('Welcome to your Chrome extension!')
    ).toBeInTheDocument();
  });
});

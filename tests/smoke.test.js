import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App component', () => {
  it('renders the Container component', () => {
    render(<App />);
    const containerElement = screen.getByTestId('container');
    expect(containerElement).toBeInTheDocument();
  });
});

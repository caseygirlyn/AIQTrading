import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/App';

// Helper function to render App within the Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};
describe('App Component', () => {
  test('renders the Container component on the root route', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
  test('renders the SignUp component on the /signup route', () => {
    renderWithRouter(<App />, { route: '/signup' });
    expect(screen.getByTestId('signup')).toBeInTheDocument();
  });
});

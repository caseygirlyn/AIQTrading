import React from 'react';
import { render, screen } from '@testing-library/react';
import * as userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/App';

// Helper function to render App within the Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

it('App Component Renders Without Error', () => {
    renderWithRouter(<App />);
});
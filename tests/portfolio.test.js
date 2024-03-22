import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Portfolio from '../src/components/Portfolio';

// Mock AlpacaOrder to avoid real network requests or complex interactions
jest.mock('../src/components/alpaca/Order', () => {
  return function DummyAlpacaOrder(props) {
    return (
      <div data-testid="mock-alpaca-order">{`AlpacaOrder component with symbol: ${props.symbol}`}</div>
    );
  };
});

const mockAccountData = {};
const mockPositionsData = [];

// Mock AlpacaPortfolio & Account
jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('https://paper-api.alpaca.markets/v2/positions')) {
      return Promise.resolve({ data: mockPositionsData });
    } else if (url.includes('https://paper-api.alpaca.markets/v2/account')) {
      return Promise.resolve({ data: mockAccountData });
    }
    return Promise.reject(new Error(`Unhandled request: ${url}`));
  })
}));

// Mock ChartJs 
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-bar-chart"></div>,
  Line: () => <div data-testid="mock-line-chart"></div>,
  Doughnut: () => <div data-testid="mock-doughnut-chart"></div>,
  Pie: () => <div data-testid="mock-pie-chart"></div>,
}));

// Mock Canvas context
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
});

describe('Portfolio Component', () => {
  test('renders tickers and interacts with AlpacaOrder component', async () => {
    render(
      <Router>
        <Portfolio />
      </Router>
    );

    await waitFor(() => {
      const nvdaText = screen.getByText('NVDA');
      expect(nvdaText).toBeInTheDocument();
      const metaText = screen.getByText('META');
      expect(metaText).toBeInTheDocument();

      // Interact with the 'Buy' button for NVDA
      const nvdaRow = nvdaText.closest('tr');
      const buyButtonNVDA = within(nvdaRow).getByText('Buy');
      fireEvent.click(buyButtonNVDA);
      
      // Check if AlpacaOrder is rendered with NVDA
      expect(screen.getByTestId('mock-alpaca-order')).toHaveTextContent('AlpacaOrder component with symbol: NVDA');

      // Interact with the 'Sell' button for META
      const metaRow = metaText.closest('tr');
      const sellButtonMETA = within(metaRow).getByText('Sell');
      fireEvent.click(sellButtonMETA);

      // Check if AlpacaOrder is rendered with META
      expect(screen.getByTestId('mock-alpaca-order')).toHaveTextContent('AlpacaOrder component with symbol: META');
    });
  });
});


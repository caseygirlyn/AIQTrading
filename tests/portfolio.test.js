import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Portfolio from '../src/components/Portfolio';
import AlpacaOrder from '../src/components/alpaca/Order';

// Mock AlpacaOrder to avoid real network requests or complex interactions
jest.mock('../src/components/alpaca/Order', () => {
  return function DummyAlpacaOrder(props) {
    return (
      <div data-testid="mock-alpaca-order">{`AlpacaOrder component with symbol: ${props.symbol}`}</div>
    );
  };
});

describe('Portfolio Component', () => {
    test('renders tickers and interacts with AlpacaOrder component', () => {
        render(<Portfolio />);

        // Check render some tickers
        expect(screen.getByText('NVDA - NVIDIA Corporation')).toBeInTheDocument();
        expect(screen.getByText('META - Meta Platforms, Inc.')).toBeInTheDocument();

        // Check ticker container
        const nvdaContainer = screen.getByText('NVDA - NVIDIA Corporation').closest('div');
        const tradeButton = within(nvdaContainer).getByText('Trade');
        fireEvent.click(tradeButton);

        // Check AlpacaOrder rendered with correct symbol
        expect(screen.getByTestId('mock-alpaca-order')).toHaveTextContent('AlpacaOrder component with symbol: NVDA');
    });
});

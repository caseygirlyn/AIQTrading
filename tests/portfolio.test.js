import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Portfolio from '../src/components/Portfolio';

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

    // Check that some tickers are rendered
    expect(screen.getByText('NVDA - NVIDIA Corporation')).toBeInTheDocument();
    expect(screen.getByText('META - Meta Platforms, Inc.')).toBeInTheDocument();

    // Interact with the 'Buy' button for a specific ticker (e.g., NVDA)
    const nvdaContainer = screen.getByText('NVDA - NVIDIA Corporation').closest('div');
    const buyButton = within(nvdaContainer).getByText('Buy');
    fireEvent.click(buyButton);

    // Check if AlpacaOrder is rendered with the correct symbol after clicking 'Buy'
    expect(screen.getByTestId('mock-alpaca-order')).toHaveTextContent('AlpacaOrder component with symbol: NVDA');

    // Interact with the 'Sell' button for a different ticker (e.g., META)
    const metaContainer = screen.getByText('META - Meta Platforms, Inc.').closest('div');
    const sellButton = within(metaContainer).getByText('Sell');
    fireEvent.click(sellButton);

    // Check if AlpacaOrder is rendered with the correct symbol after clicking 'Sell'
    expect(screen.getByTestId('mock-alpaca-order')).toHaveTextContent('AlpacaOrder component with symbol: META');
  });
});

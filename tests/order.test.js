import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AlpacaOrder from '../src/components/alpaca/Order';

// Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ orderId: '12345' })
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('AlpacaOrder Component', () => {
  test('renders and handles order placement', async () => {
    render(<AlpacaOrder symbol="AAPL" />);

    // Check if the component is rendered with the correct symbol
    expect(screen.getByText(/Trading AAPL/)).toBeInTheDocument();

    // Simulate user changing quantity
    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);

    // Simulate user clicking 'Place Order' button
    const placeOrderButton = screen.getByText('Place Order');

    // Using 'act' to wait for the promise to resolve
    await act(async () => {
      fireEvent.click(placeOrderButton);
    });

    // Asserting that fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      'https://paper-api.alpaca.markets/v2/orders',
      expect.objectContaining({
        method: 'POST',
        headers: expect.anything(),
        body: JSON.stringify({
          symbol: 'AAPL',
          qty: 2, // Updated qty after increment button click
          side: 'buy', // The default side in Order.jsx is 'buy'
          type: 'market',
          time_in_force: 'day',
        }),
      }),
    );

    // Checking if the response is displayed
    expect(screen.getByText(/"orderId":\s*"12345"/)).toBeInTheDocument();
  });
});

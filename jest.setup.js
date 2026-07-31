import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';
import 'jest-canvas-mock';
import { TextDecoder, TextEncoder } from 'util';

global.ResizeObserver = ResizeObserver;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
  
console.log('Jest setup file executed');

// Suppress React Router v6 deprecation warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('React Router') && args[0]?.includes?.('Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};

jest.mock('chart.js', () => {
    const originalModule = jest.requireActual('chart.js');
    return {
      ...originalModule,
      Chart: {
        register: jest.fn(),
        defaults: originalModule.Chart.defaults,
      },
      CategoryScale: jest.fn(),
      LinearScale: jest.fn(),
      TimeScale: jest.fn(),
      PointElement: jest.fn(),
      LineElement: jest.fn(),
      Title: jest.fn(),
      Tooltip: jest.fn(),
      Legend: jest.fn(),
      LineController: jest.fn(),
    };
  });
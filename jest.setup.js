import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';
import 'jest-canvas-mock';

global.ResizeObserver = ResizeObserver;
  
console.log('Jest setup file executed');

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
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';
import 'jest-canvas-mock';

global.ResizeObserver = ResizeObserver;
  
console.log('Jest setup file executed');
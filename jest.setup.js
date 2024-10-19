import '@testing-library/jest-dom'
import 'jest-fetch-mock'

// Increase the default timeout
jest.setTimeout(10000)

// Mock createRoot for React 18
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn((container) => ({
    render: jest.fn(),
    unmount: jest.fn(),
  })),
}))

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

// Suppress React 18 console warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app'

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test('renders without error', () => {
    render(
        <App />
    );

});

test('renders grid container', () => {
    render(
        <App />
    );
    const container = screen.getByTestId('grid-container')
    console.log(container.innerHTML)
});
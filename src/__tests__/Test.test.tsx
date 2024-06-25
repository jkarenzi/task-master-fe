import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from '../pages/Home';

describe('App tests', () => {
  it('Should display base text on homepage', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'This is my home page'
    );
  });
});

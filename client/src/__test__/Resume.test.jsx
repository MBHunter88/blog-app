import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Resume from '../components/Resume';
import { describe, it, expect } from 'vitest';

describe('Resume Component', () => {
  it('renders the resume page with key sections', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /michelle bedford-hunter/i })).toBeDefined();
    expect(screen.getByText(/summary/i)).toBeTruthy();
    expect(screen.getByText(/experience/i)).toBeTruthy();
    expect(screen.getByText(/education/i)).toBeTruthy();
    expect(screen.getByText(/skills/i)).toBeTruthy();
  });
});

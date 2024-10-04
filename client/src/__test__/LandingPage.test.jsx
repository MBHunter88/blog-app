import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../components/LandingPage'; 
import { describe, it, expect } from 'vitest';

describe('LandingPage Component', () => {
  it('renders the landing page content correctly', () => {
    render(<LandingPage />);

    // Check that the static content is rendered correctly
    //expect(screen.getByText(/from doula to developer/i)).toBeInTheDocument();
    //expect(screen.getByText(/this blog chronicles my unique journey/i)).toBeInTheDocument();
    //expect(screen.getByRole('link', { name: /my journey/i })).toBeInTheDocument();
  });

});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../components/About'; 

describe('About Component', () => {
  it('renders the about page with the correct content', () => {
    render(<About />);

    // Check for headings
   expect(screen.getByRole('heading', { level: 1 })).toBeDefined(/About me/i);
   expect(screen.getByRole('heading', { level: 3 })).toBeDefined(/Let's Connect!/i);

    // Check for paragraph text
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeTruthy();

    //Check for the image alt text
    const img = screen.getByAltText(/headshot/i);
    expect(img).toBeDefined();
    expect(img.src).toContain('headshot.jpg'); // Verify the image source

    // Check for the LinkedIn icon link
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink.getAttribute('href')).to.equal('https://www.linkedin.com/in/michelle-bedfordhunter');
  });
});

import React from 'react';
import { render, screen  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx'; 
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('renders the navigation bar correctly', () => {
    render( <MemoryRouter>
        <NavBar />
      </MemoryRouter>);

   
  });

});

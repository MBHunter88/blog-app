import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogPosts from '../components/BlogPosts'; 
import { BrowserRouter } from 'react-router-dom'; 
import { vi, describe, it, expect, beforeEach} from 'vitest'; 

// Mock fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, title: 'First Post', author: 'John Doe' }]),
  })
);

describe('BlogPosts Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <BlogPosts />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading',{ level: 1 })).toBeDefined(/Latest Post/i);
  });

  it('fetches and displays posts', async () => {
    render(
      <BrowserRouter>
        <BlogPosts />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/First Post/i)).toBeTruthy();
      expect(screen.getByText(/John Doe/i)).toBeTruthy();
    });
  });
});

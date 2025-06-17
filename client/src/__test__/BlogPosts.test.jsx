import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogPosts from '../components/BlogPosts';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach} from 'vitest';
import { AuthContext } from '../context/AuthContext';

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
      <AuthContext.Provider value={{ token: '', login: vi.fn(), logout: vi.fn() }}>
        <BrowserRouter>
          <BlogPosts />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('heading',{ level: 1 })).toBeDefined(/Latest Post/i);
  });

  it('fetches and displays posts', async () => {
    render(
      <AuthContext.Provider value={{ token: '', login: vi.fn(), logout: vi.fn() }}>
        <BrowserRouter>
          <BlogPosts />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/First Post/i)).toBeTruthy();
      expect(screen.getByText(/John Doe/i)).toBeTruthy();
    });
  });
});

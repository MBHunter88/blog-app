import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../components/CreatePost';
import { vi, describe, it, afterEach, expect } from 'vitest';
import { AuthContext } from '../context/AuthContext';

describe('CreatePost Component', () => {
  import.meta.env = { VITE_API_URL: 'http://localhost:8181' };
  const mockAddNewPost = vi.fn();

  // Mock fetch function
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'New Post', content: 'This is a new post.', author: 'Jane Doe' }),
    })
  );

  afterEach(() => {
    vi.clearAllMocks(); 
  });


  it('submits the form successfully', async () => {
    render(
      <AuthContext.Provider value={{ token: 'test-token', login: vi.fn(), logout: vi.fn() }}>
        <CreatePost addNewPost={mockAddNewPost} />
      </AuthContext.Provider>
    );

    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'This is a new post.' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Jane Doe' } });

    // Submit the form
    fireEvent.click(screen.getByText(/create post/i));

    // Check if fetch was called with the right arguments
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ Authorization: 'Bearer test-token' })
        })
      );
    });

    // Check if addNewPost was called with the created post
    await waitFor(() => {
      expect(mockAddNewPost).toHaveBeenCalledWith({
        id: 1,
        title: 'New Post',
        content: 'This is a new post.',
        author: 'Jane Doe',
      });
    });

    // Check if the form fields are cleared after successful submission
    expect(screen.getByLabelText(/title/i).value).toBe('');
    expect(screen.getByLabelText(/content/i).value).toBe('');
    expect(screen.getByLabelText(/author/i).value).toBe('');
  });

  
});

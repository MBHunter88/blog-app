import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../components/CreatePost';
import { vi, describe, it, afterEach, expect } from 'vitest';

describe('CreatePost Component', () => {
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
    render(<CreatePost addNewPost={mockAddNewPost} />);

    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'This is a new post.' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Jane Doe' } });

    // Submit the form
    fireEvent.click(screen.getByText(/create post/i));

    // Check if fetch was called with the right arguments
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('http://localhost:8181/api/posts', expect.anything())
    );

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

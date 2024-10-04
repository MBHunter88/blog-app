import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetails from '../components/PostDetail'; 
import { vi, describe, it, afterEach, expect } from 'vitest'
import { useParams } from 'react-router-dom'; 

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn(),
}));

describe('PostDetails Component', () => {

  // Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, title: 'Test Post', author: 'John Doe', content: 'This is a test post.' }),
  })
);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the post details correctly', async () => {
    useParams.mockReturnValue({ postId: 1 });
    render(
     
      <PostDetails />
     
    );

    // Check if the post title, author, and content are rendered
    await waitFor(() => expect(screen.getAllByText(/Test Post/i)).toBeTruthy());
    expect(screen.getAllByText(/John Doe/i)).toBeTruthy();
    expect(screen.getAllByText(/This is a test post./i)).toBeTruthy();
  });

 

 
});

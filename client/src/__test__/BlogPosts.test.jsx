import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogPosts from '../components/BlogPosts'; // Adjust the import path as needed
import { BrowserRouter } from 'react-router-dom'; // For using the Link component
import { jest }

// Mock fetch API
global.fetch = jest.fn(() =>
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
    expect(screen.getByText(/Latest Posts/i)).toBeInTheDocument();
  });

  it('fetches and displays posts', async () => {
    render(
      <BrowserRouter>
        <BlogPosts />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/First Post/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  it('allows deletion of a post', async () => {
    render(
      <BrowserRouter>
        <BlogPosts />
      </BrowserRouter>
    );

    // Simulate clicking the delete button
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /trash-outline/i });
      fireEvent.click(deleteButton);
    });

    // After deletion, the post should not be in the document anymore
    await waitFor(() => {
      expect(screen.queryByText(/First Post/i)).not.toBeInTheDocument();
    });
  });

  // Optional: You can also add tests for adding a new post
});

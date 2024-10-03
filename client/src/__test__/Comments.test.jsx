import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Comments from '../components/Comments'; // Adjust the import path if needed
import { vi, describe, expect, it, beforeEach } from 'vitest';


global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, content: 'Test comment', author: 'John Doe', sentiment_score: 1 },
      ]),
  })
);

describe('Comments Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the comments section and fetches comments', async () => {
    render(<Comments selectedPost={1} />);

    const toggleButton = screen.getByText(/View Comments/i);
    fireEvent.click(toggleButton);

    await waitFor(() => {
        expect(screen.getByText(/Test comment/i)).not.toBeNull();
        expect(screen.getByText(/John Doe/i)).not.toBeNull();
        
    });
  });

  //TODO: test for adding new comment
  it('allows adding a new comment', async () => {
    // Mock the POST request
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 2, content: 'New Comment', author: 'Jane Doe', flagged: false, sentiment_score: 1 }),
      })
    );

    render(<Comments selectedPost={1} />);


  });

//TODO: test if comment is flagged 
  it('shows alert if comment is flagged by moderation', async () => {
    // Mock the POST request for flagged comment
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ flagged: true }),
      })
    );

    render(<Comments selectedPost={1} />);

  
  });
});

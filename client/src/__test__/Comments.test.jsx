import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Comments from '../components/Comments';
import { vi, describe, expect, it, beforeEach } from 'vitest';
import { AuthContext } from '../context/AuthContext';


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
    render(
      <AuthContext.Provider value={{ token: 'test', login: vi.fn(), logout: vi.fn() }}>
        <Comments selectedPost={1} />
      </AuthContext.Provider>
    );

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

    render(
      <AuthContext.Provider value={{ token: 'test', login: vi.fn(), logout: vi.fn() }}>
        <Comments selectedPost={1} />
      </AuthContext.Provider>
    );


  });

//TODO: test if comment is flagged 
  it('shows alert if comment is flagged by moderation', async () => {
    // Mock the POST request for flagged comment
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ flagged: true }),
      })
    );

    render(
      <AuthContext.Provider value={{ token: 'test', login: vi.fn(), logout: vi.fn() }}>
        <Comments selectedPost={1} />
      </AuthContext.Provider>
    );

  
  });
});

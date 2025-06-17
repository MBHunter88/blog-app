import React, { useState } from 'react';
import '../styles/CreatePost.css'

const BASE_URL = import.meta.env.VITE_API_URL;

const CreatePost = ({ addNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // validation
    if (!title || !content) {
      alert('Please fill out the title, content and author');
      return;
    }

    const newPost = { title, content, author };

    try {
      const response = await fetch(`h${BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json(); 
        addNewPost(createdPost);
        // Clear the form after successful submission
        setTitle('');
        setContent('');
        setAuthor('');
        alert('Post created successfully');
      } else {
        alert('Error creating post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
    <label className="form-label">
      Title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-input" />
    </label>
    <label className="form-label">
      Content:
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="form-textarea" />
    </label>
    <label className="form-label">
      Author:
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-input" />
    </label>
    <button type="submit" className="submit-button">Create Post</button>
  </form>
  );
};

export default CreatePost;

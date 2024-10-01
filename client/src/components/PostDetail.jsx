//full blog post content tied to blog post id
//comments 
//a button to read post aloud (text-to-speech)
import React, { useState, useEffect } from 'react';
import Comments from './Comments';

const PostDetails = ({ selectedPost, goBack }) => {
const [postById, setPostById] = useState({});

  // Fetch details for the selected post
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://localhost:8181/api/posts/${selectedPost}`);
        const data = await response.json();
        console.log('Fetched post by ID:', data);
        setPostById(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
        throw error;
      }
    };

    if (selectedPost) {
        fetchPostById();
    }
  }, [selectedPost]);




    return (
        <>
        <div className="post-details-card">
              <h2>{postById.title}</h2>
              <p><strong>Author:</strong> {postById.author}</p>
              <p>{postById.content}</p>
              <button onClick={goBack}>Return Home</button>
            </div>
            <div><Comments selectedPost={selectedPost}/></div>
        </>
    )
}

export default PostDetails;
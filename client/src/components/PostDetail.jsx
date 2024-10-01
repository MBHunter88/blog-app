import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const PostDetails = () => {
    const { postId } = useParams();
const [postById, setPostById] = useState({});

  // Fetch details for the selected post
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://localhost:8181/api/posts/${postId}`);
        const data = await response.json();
        console.log('Fetched post by ID:', data);
        setPostById(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
        throw error;
      }
    };

    if (postId) {
        fetchPostById();
    }
  }, [postId]);




    return (
        <>
        <div className="post-details-card">
              <h2>{postById.title}</h2>
              <p><strong>Author:</strong> {postById.author}</p>
              <p>{postById.content}</p>
              <button>Read Post Aloud</button>
            </div>
            <div><Comments selectedPost={postId}/></div>
        </>
    )
}

export default PostDetails;
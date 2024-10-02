import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const PostDetails = () => {
    const { postId } = useParams();
const [postById, setPostById] = useState({});
const [audioUrl, setAudioUrl] = useState(null);

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

// Function to generate speech for the post content
const handleGenerateSpeech = async () => {
    try {
      const response = await fetch(`http://localhost:8181/api/posts/${postId}/speech`);

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        console.log("Audio URL: ", audioUrl);
      } else {
        console.error('Error generating speech:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!postId) {
    return <p>Loading post...</p>;
  }


    return (
        <>
        <div className="post-details-card">
              <h2>{postById.title}</h2>
              <p><strong>Author:</strong> {postById.author}</p>
              <p>{postById.content}</p>
              <button onClick={handleGenerateSpeech} >Read Post Aloud</button>
              {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
        </div>
        )}
            </div>
            <div><Comments selectedPost={postId}/></div>
        </>
    )
}

export default PostDetails;
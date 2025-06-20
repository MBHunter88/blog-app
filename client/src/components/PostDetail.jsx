import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import '../styles/PostDetail.css'

const BASE_URL = import.meta.env.VITE_API_URL;

const PostDetails = () => {
    const { postId } = useParams();
const [postById, setPostById] = useState({});
const [audioUrl, setAudioUrl] = useState(null);

  // Fetch details for the selected post
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/posts/${postId}`);
        const data = await response.json();
        console.log('Fetched post by ID:', data);
        // Replace literal \n sequences with actual line breaks
        const processedContent = data.content?.replace(/\\n/g, '\n');
        setPostById({ ...data, content: processedContent });
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
      const response = await fetch(`${BASE_URL}/api/posts/${postId}/speech`);

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
        <div className='post-detail-container'>
       <div className="post-details-card">
        <h2 className="post-title">{postById.title}</h2>
        <p className="post-author"><strong>Author:</strong> {postById.author}</p>
        <p className="post-content">{postById.content}</p>
        <button className="speech-button" onClick={handleGenerateSpeech}>Read Post Aloud</button>
        {audioUrl && (
          <div className="audio-player">
            <audio controls src={audioUrl}></audio>
          </div>
        )}
      </div>
      <div>
        <Comments selectedPost={postId} />
      </div>
        </div>
    )
}

export default PostDetails;
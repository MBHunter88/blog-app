 import React, { useEffect, useState, useContext } from "react";
 import '../styles/Comments.css'
 import { AuthContext } from '../context/AuthContext';

 const BASE_URL = import.meta.env.VITE_API_URL;

const Comments = ({ selectedPost }) => {
const [comments, setComments] = useState([])
const [newComment, setNewComment] = useState('')
const [newAuthor, setNewAuthor] = useState('')
const [isExpanded, setIsExpanded] = useState(false);
const { token } = useContext(AuthContext);
const isAdminEnabled = import.meta.env.VITE_ADMIN_ENABLED === 'true';

    useEffect(() => {
        const fetchCommentsByPostId = async () => {
          try {
            const response = await fetch(`${BASE_URL}/api/comments/${selectedPost}`);
            const data = await response.json();
            console.log('Fetched comments post by ID:', data);
            if (data.length > 0) {
                setComments(data);
              } else {
                console.error("There are not comments for this post", data);
              }
          } catch (error) {
            console.error('Error fetching comments:', error.message);
            throw error;
          }
        };
    
        if (selectedPost) {
            fetchCommentsByPostId();
        }
      }, [selectedPost]);
    
       // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment || !newAuthor) {
      alert("Both comment and author are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/posts/${selectedPost}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment, author: newAuthor }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newCommentData = await response.json();

      //if comment was flagged by ai moderation show alert message and don't post
      if (newCommentData.flagged) {
        alert('Your comment was flagged as inappropriate and cannot be posted.');
        return; 
      } else {

      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(''); // Clear comment field
      setNewAuthor(''); // Clear author field
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  //get sentiment score
  const getSentimentColor = (score) => {
    if (score > 0) return 'green'
    if (score < 0) return 'red'
    return 'gray';
  }

//delete comment
const deleteComment = async (commentId, postId) => {
    try {
      await fetch(`${BASE_URL}/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  //toggle comment section
  const toggleComments = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="comments-section">
      {/* Toggle Button */}
      <button className="toggle-comments-button" onClick={toggleComments}>
        {isExpanded ? 'Hide Comments' : 'View Comments'}
      </button>
  
      {/* Collapsible Comments Container */}
      <div className={`comments-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {selectedPost && isExpanded ? (
          <>
            <h3>Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ul key={comment.id} className="comment-item">
                  <li>
                    <p style={{ color: getSentimentColor(comment.sentiment_score)}}>{comment.content}</p>
                    <p><strong>Author:</strong> {comment.author}</p>
                  </li>
                  {isAdminEnabled && token && (
                    <button className="comments-delete-button" onClick={() => deleteComment(comment.id, selectedPost)}>Delete</button>
                  )}
                </ul>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </>
        ) : null}
      </div>
  
      {/* Add Comment Section (always visible) */}
      <div className="add-comment">
        <h4>Add a Comment</h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here"
          className="comment-input"
        />
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Your name"
          className="author-input"
        />
        <button className="add-button" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
  
}

export default Comments
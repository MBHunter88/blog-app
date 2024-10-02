 import React, { useEffect, useState } from "react";
 import '../styles/Comments.css'

const Comments = ({ selectedPost }) => {
const [comments, setComments] = useState([])
const [newComment, setNewComment] = useState('')
const [newAuthor, setNewAuthor] = useState('')
const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchCommentsByPostId = async () => {
          try {
            const response = await fetch(`http://localhost:8181/api/comments/${selectedPost}`);
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
      const response = await fetch(`http://localhost:8181/api/posts/${selectedPost}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment, author: newAuthor }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newCommentData = await response.json();
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(''); // Clear comment field
      setNewAuthor(''); // Clear author field
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

//delete comment
const deleteComment = async (commentId, postId) => {
    try {
      await fetch(`http://localhost:8181/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
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
                    <p className="comment-content">{comment.content}</p>
                    <p className="comment-author"><strong>Author:</strong> {comment.author}</p>
                  </li>
                  <button className="comments-delete-button" onClick={() => deleteComment(comment.id, selectedPost)}>Delete</button>
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
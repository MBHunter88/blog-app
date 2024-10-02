 import React, { useEffect, useState } from "react";

const Comments = ({ selectedPost }) => {
const [comments, setComments] = useState([])
const [newComment, setNewComment] = useState('')
const [newAuthor, setNewAuthor] = useState('')

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

  //get sentiment score
  const getSentimentColor = (score) => {
    if (score > 0) return 'green'
    if (score < 0) return 'red'
    return 'gray';
  }

//delete comment
const deleteComment = async (commentId, postId) => {
    try {
      await fetch(`http://localhost:8181/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

    return (
        <div>
        {selectedPost ? (
          <>
            <h3>Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ul key={comment.id}>
                  <li>
                    <p style={{ color: getSentimentColor(comment.sentiment_score)}}>{comment.content}</p>
                    <p><strong>Author:</strong> {comment.author}</p>
                  </li>
                  <button onClick={() => deleteComment(comment.id) }>Delete Comment</button>
                </ul>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
  
            {/* Add Comment Section */}
            <div>
            <h4>Add a Comment</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment"
            />
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Your name"
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          </>
        ) : (
          <p>Select a post to see comments.</p>
        )}
      </div>
    )
}

export default Comments
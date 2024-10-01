//use post id to associate comments with correct post
//comment text
//button to add comment 
import React, { useEffect, useState } from "react";

const Comments = ({ selectedPost }) => {
const [comments, setComments] = useState([])

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
    

    return (
        <div>
        {selectedPost ? (
          <>
            <h3>Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ul key={comment.id}>
                  <li>
                    <p>{comment.content}</p>
                    <p><strong>Author:</strong> {comment.author}</p>
                  </li>
                </ul>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
  
            {/* Add Comment Section */}
            <div>
        
            </div>
          </>
        ) : (
          <p>Select a post to see comments.</p>
        )}
      </div>
    )
}

export default Comments
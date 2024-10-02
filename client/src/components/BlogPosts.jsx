import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import '../styles/BlogPosts.css'

const BlogPosts = () => {
    //state management
    const [posts, setPosts] = useState([]);
   
    // Fetch posts on page load
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8181/api/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
                throw error;
            }
        };
        fetchPosts();
    }, []);

    const addNewPost = (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]); 
    };

    // Delete post
    const deletePost = async (postId) => {
      await fetch(`http://localhost:8181/posts/${postId}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.id !== postId));
  }
 
   
    return (
      <div className="blog-posts-page">
      <h1 className="page-title">Blog Posts</h1>
      <ul className="posts-list">
          {posts.map((post) => (
              <li key={post.id} className="post-item">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-author">By {post.author}</p>
                  <Link to={`/posts/${post.id}`} className="read-more">Read More</Link><br/>
                  <button onClick={() => deletePost(post.id)} className="delete-button">Delete</button>
              </li>
          ))}
      </ul>
      <CreatePost addNewPost={addNewPost}/>
  </div>
    )
};

export default BlogPosts;
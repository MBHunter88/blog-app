import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import '../styles/BlogPosts.css'
import { AuthContext } from '../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_URL;

const BlogPosts = () => {
    //state management
    const [posts, setPosts] = useState([]);
    const { token } = useContext(AuthContext);
    const isAdminEnabled = import.meta.env.VITE_ADMIN_ENABLED === 'true';
   
    // Fetch posts on page load
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/posts`);
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
      await fetch(`${BASE_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post.id !== postId));
  }
 
   
    return (
      <div className="blog-posts-page">
      <h1 className="page-title">Latest Posts</h1>
      <ul className="posts-list">
          {posts.map((post) => (
              <li key={post.id} className="post-item">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-author">By {post.author}</p>
                  <Link to={`/posts/${post.id}`} className="read-more">Read More</Link><br/>
                  {isAdminEnabled && token && (
                    <button aria-label="delete post" className="delete-button" onClick={() => deletePost(post.id)}><span role="img" aria-label="trash">🗑️</span></button>
                  )}
              </li>
          ))}
      </ul>
      {isAdminEnabled && token && <CreatePost addNewPost={addNewPost}/>}
  </div>
    )
};

export default BlogPosts;
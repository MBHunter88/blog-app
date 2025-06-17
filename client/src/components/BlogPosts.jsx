import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import '../styles/BlogPosts.css'

const BASE_URL = import.meta.env.VITE_API_URL;

const BlogPosts = () => {
    //state management
    const [posts, setPosts] = useState([]);
   
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
      await fetch(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
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
                  <button aria-label="trash-outline" className="delete-button" onClick={() => deletePost(post.id)} ><ion-icon name="trash-outline"></ion-icon></button>
              </li>
          ))}
      </ul>
      <CreatePost addNewPost={addNewPost}/>
  </div>
    )
};

export default BlogPosts;
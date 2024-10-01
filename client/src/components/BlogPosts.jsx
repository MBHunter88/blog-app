//display list of posts as cards
//each card will include: titile, excerpt (maybe image)
//card will have a button to "read more" that will render full blog post (PostDetail.jsx)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';

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

   
    return (
        <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>By {post.author}</p>
            <Link to={`/posts/${post.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
      <CreatePost addNewPost={addNewPost}/>
    </div>
    )
};

export default BlogPosts;
import { useState, useEffect, useContext } from 'react';
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
        <p className='post-excerpt'>This blog chronicles my unique journey from the world of birth work to the dynamic world of software development.
                        For years, I dedicated myself to supporting families through one of life’s most transformative experiences—birth.
                        As a doula, I learned the power of empathy, problem-solving, and resilience.
                        Now, I’m harnessing those same skills to navigate the tech industry and create innovative solutions for the future.
                        Here, you’ll find reflections on my transition into tech, insights into the challenges and triumphs I’ve encountered, 
                        and the lessons I’ve learned along the way. Whether you’re a fellow career-changer or someone simply curious about 
                        the journey, I’m excited to share this adventure with you.
                        Let’s build something great together.</p>
      <h1 className="page-title">Latest Posts</h1>
      <ul className="posts-list">
          {posts.map((post) => (
              <li key={post.id} className="post-item">
                  <h1 className="post-title" to={`/posts/${post.id}`}>{post.title}</h1><br/>
                  <p className="post-excerpt"> {post.content
                    ? (() => {
                        const firstSentence = post.content.split('. ')[0] + '.';
                        return firstSentence.length > 100
                          ? firstSentence.slice(0, 100) + '...'
                          : firstSentence;
                      })()
                    : ''}</p>  
                  {/* <p className="post-author">By {post.author}</p> */}
                  <Link className="read-more" to={`/posts/${post.id}`}>Read More &rarr;</Link>
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
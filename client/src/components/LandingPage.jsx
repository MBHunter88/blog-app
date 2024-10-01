//display list of posts as cards
//each card will include: titile, excerpt (maybe image)
//card will have a button to "read more" that will render full blog post (PostDetail.jsx)
import React, { useState, useEffect } from 'react';
import PostDetails from './PostDetail';

const LandingPage = () => {
    //state management
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

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

    //handle read more button
    const handleReadMore = (post) => {
        setSelectedPost(post.id)
    }

    return (
        <div>
        {!selectedPost ? (
            posts.map((post) => (
                <ul key={post.id}>
                    <li>
                        <p>{post.title}</p>
                        <p>{post.author}</p>
                        <button onClick={() => handleReadMore(post)}>
                            Read More
                        </button>
                    </li>
                </ul>
            ))
        ) : (
            <PostDetails 
            selectedPost={selectedPost}
            goBack={() => setSelectedPost(null)} />
        )}
    </div>
    )
};

export default LandingPage;
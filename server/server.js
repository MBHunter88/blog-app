import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import OpenAI from "openai";
import pkg from 'pg';

//use .env for variables
dotenv.config();

//connect database
const { Pool } = pkg;
const db = new Pool({
    connectionString: process.env.DATABASE_URI
});

//initiallize express app
const app = express();

// Initialize OpenAI API with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is in your .env file
});

const PORT = process.env.PORT;

//config cors middleware
app.use(cors());
app.use(express.json());

//READ posts
app.get('/api/posts', async (req, res) => {
    try {
        const { rows: posts } = await db.query('SELECT * FROM posts');
        res.send(posts);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch blog posts',
            message: error.message,
            operation: 'GET /api/posts'
        });
    }
});

// READ post by id
app.get('/api/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        // Log the postId to verify it's being received correctly
        console.log('Fetching post with ID:', postId);

        const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);

        // Check if no rows are returned (post not found)
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Return the specific post
        res.json(rows[0]);

    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({
            error: 'Failed to fetch the post',
            message: error.message,
            operation: 'GET /api/posts/:postId'
        });
    }
});

//CREATE new blog post
app.post('/api/posts', async (req, res) => {
    const { title, content, author } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required.' });
    }

    try {
        const result = await db.query(
            'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
            [title, content, author]
        );

        // Send the newly created post as a response
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            error: 'Failed to create post',
            message: error.message,
            operation: 'POST /api/posts'
        });
    }
});



// AI moderation for comments
app.post('/api/posts/:postId/comments', async (req, res) => {
    const { content, author } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!content || !author) {
        return res.status(400).json({ error: 'Content and author are required.' });
    }

    try {
        // Send content to OpenAI's Moderation API
        // const moderation = await openai.moderations.create({
        //     input: content,
        // });

           // Mock OpenAI moderation response for development
           const moderation = {
            results: [{ flagged: false }] //no flagging for now
        };

        //  Check moderation response
        const flagged = moderation.results[0].flagged; // Check if content is flagged

        if (flagged) {
            return res.status(400).json({ error: 'Comment contains inappropriate content and was flagged.' });
        }

        //  If not flagged, insert comment into the database
        const result = await db.query(
            'INSERT INTO comments (post_id, content, author) VALUES ($1, $2, $3) RETURNING *',
            [postId, content, author]
        );

        // Return the newly created comment
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            error: 'Failed to create comment',
            message: error.message,
            operation: 'POST /api/posts/:postId/comments'
        });
    }
});






app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))



export default app;
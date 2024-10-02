import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import OpenAI from "openai";
import pkg from 'pg';
import fs from "fs";
import path from "path";

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
const speechFile = path.resolve("./speech.mp3");

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

// READ comments by post_id
app.get('/api/comments/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        // Log the postId to verify it's being received correctly
        console.log('Fetching comments with post_id:', postId);

        const { rows } = await db.query('SELECT * FROM comments WHERE post_id = $1', [postId]);

        // Check if no rows are returned
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comments not found' });
        }

        res.json(rows);

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            error: 'Failed to fetch the comments',
            message: error.message,
            operation: 'GET /api/comments/:postId'
        });
    }
});

//DELETE post by id
app.delete('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await db.query('DELETE FROM posts WHERE id=$1', [postId]);
        console.log("From the delete request-url", postId);
        res.json({ message: 'Post deleted successfully' });
    } catch (e) {
        console.log(e);
        return res.status(400).json({  error: 'Something went wrong, please try again.' });

    }
});


//TODO: Check if original enpoint works once openai servers are back up 
// AI moderation for comments
app.post('/api/posts/:postId/comments', async (req, res) => {
    const { content, author } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!content || !author) {
        return res.status(400).json({ error: 'Content and author are required.' });
    }

    try {
        console.log(content)
       
        // Send content to OpenAI's Moderation API
        // const moderation = await openai.moderations.create({
        //     model: "omni-moderation-latest",
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

//DELETE comment by id
app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        await db.query('DELETE FROM comments WHERE id=$1', [commentId]);
        console.log("From the delete request-url", commentId);
        res.json({ message: 'Comment deleted successfully' });
    } catch (e) {
        console.log(e);
        return res.status(400).json({  error: 'Something went wrong, please try again.' });

    }
});

// Text-to-Speech for a specific blog post by postId
app.get('/api/posts/:postId/speech', async (req, res) => {
    const { postId } = req.params;

    try {
        // Step 1: Fetch the blog post from the database by ID
        const { rows } = await db.query('SELECT content FROM posts WHERE id = $1', [postId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const postContent = rows[0].content;

        // Step 2: Call OpenAI's Text-to-Speech API
        const response = await openai.audio.speech.create({
            model: 'tts-1', 
            voice: "alloy",
            input: postContent, 
        });

        const audioData = response.data.audio_content;

        // Step 3: Send the audio content back to the client
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioData.length,
        });

        res.send(Buffer.from(audioData, 'base64'));
    } catch (error) {
        console.error('Error generating speech for post:', error.message);
        res.status(500).json({ error: 'Failed to generate speech' });
    }
});


//TODO: alternative request set up 
// AI moderation for comments
// app.post('/api/posts/:postId/comments', async (req, res) => {
//     const { content, author } = req.body;
//     const { postId } = req.params;

//     if (!content || !author) {
//         return res.status(400).json({ error: 'Content and author are required.' });
//     }

//     try {
//         // Step 1: Moderate the comment using the OpenAI Moderation API
//         const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//             },
//             body: JSON.stringify({ input: content }),
//         });

//         if (!moderationResponse.ok) {
//             throw new Error('Failed to call OpenAI Moderation API');
//         }

//         const moderationData = await moderationResponse.json();
//         const flagged = moderationData.results[0].flagged;

//         if (flagged) {
//             return res.status(400).json({ error: 'Comment contains inappropriate content and was flagged.' });
//         }

//         // Step 2: If not flagged, insert comment into the database
//         const result = await db.query(
//             'INSERT INTO comments (post_id, content, author) VALUES ($1, $2, $3) RETURNING *',
//             [postId, content, author]
//         );

//         res.status(201).json(result.rows[0]);

//     } catch (error) {
//         console.error('Error creating comment:', error);
//         res.status(500).json({
//             error: 'Failed to create comment',
//             message: error.message,
//             operation: 'POST /api/posts/:postId/comments'
//         });
//     }
// });




app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))



export default app;
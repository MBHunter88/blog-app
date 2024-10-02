import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import OpenAI from "openai";
import pkg from 'pg';
import fs from "fs";
import path from "path";
import Sentiment from 'sentiment';

//use .env for variables
dotenv.config();

//connect database
const { Pool } = pkg;
const db = new Pool({
    connectionString: process.env.DATABASE_URI
});

//initiallize express app
const app = express();

const sentiment = new Sentiment()

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
// AI moderation and sentiment analysis for comments
app.post('/api/posts/:postId/comments', async (req, res) => {
    const { content, author } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!content || !author) {
        return res.status(400).json({ error: 'Content and author are required.' });
    }

    try {
        const sentimentResult = sentiment.analyze(content);
    console.log('Sentiment Score:', sentimentResult.score);
        
    //TODO: Use if openai api is down
    // if (sentimentResult.score < -5) {
    //     return res.status(400).json({ error: 'Comment is too negative' });
    //   }
       
        // Send content to OpenAI's Moderation API
        const moderation = await openai.moderations.create({
            model: "omni-moderation-latest",
            input: content,
        });


        //  Check moderation response
        const flagged = moderation.results[0].flagged; // Check if content is flagged

        if (flagged) {
            return res.status(200).json({ message: 'Comment was flagged as inappropriate.', flagged: true });
        }

        //  If not flagged, insert comment into the database
        const result = await db.query(
            'INSERT INTO comments (post_id, content, author, sentiment_score) VALUES ($1, $2, $3, $4) RETURNING *',
            [postId, content, author, sentimentResult.score]
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
        console.log(postContent)
        if (typeof postContent !== 'string' || postContent.trim() === '') {
            return res.status(400).json({ error: 'Post content is not a valid string.' });
        }
       
        // Step 2: Call OpenAI's Text-to-Speech API
        const response = await openai.audio.speech.create({
            model: 'tts-1', 
            voice: "alloy",
            input: postContent
        });
        // console.log('OpenAI TTS Response:', response);
        // console.log(response.body)
        const audioData = await response.arrayBuffer();

        if (!audioData) {
            return res.status(500).json({ error: 'Failed to generate speech: No audio content returned.' });
        }

        // Step 3: Send the audio content back to the client
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioData.byteLength,
        });

        res.send(Buffer.from(audioData));
    } catch (error) {
        console.error('Error generating speech for post:', error.message);
        res.status(500).json({ error: 'Failed to generate speech' });
    }
});







app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))



export default app;
import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    async function moderateText(inputText) {
      try {
        const response = await fetch('https://api.openai.com/v1/moderations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({ input: inputText }),
        });
    
        if (!response.ok) {
          throw new Error();
        }
    
        const data = await response.json();
    
        if (data.results[0].flagged) {
          console.log('Content blocked: Violates usage policies.');
          console.log('Categories:', data.results[0].categories);
        } else {
          console.log('Content allowed.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    
    const inputText = 'Sample text goes here';
    moderateText(inputText);
import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Model change karke gemini-3.6-flash kar diya hai
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

export const getMovieFromMood = async (userMood) => {
  try {
    const prompt = `You are a movie recommendation engine. The user says: "${userMood}". 
    Suggest exactly ONE highly-rated movie that matches this mood. 
    Return ONLY the exact title of the movie as a plain text string. Do not include quotes, punctuation, or any other text. Just the movie title.`;

    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    let movieTitle = response.data.candidates[0].content.parts[0].text;
    movieTitle = movieTitle.replace(/["*']/g, '').trim();
    
    return movieTitle;
  } catch (error) {
    // Agar error aaye toh console mein check karne ke liye
    console.error("EXACT GEMINI ERROR:", error.response ? error.response.data : error.message);
    throw new Error('Failed to get recommendation from AI.');
  }
};
import { useState } from 'react';
import { getMovieFromMood } from '../api/gemini';

const MoodMatcher = ({ onMovieRecommended }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // 1. AI se movie title lo
      const movieTitle = await getMovieFromMood(mood);
      // 2. Parent (Home) ko bhej do taaki wo TMDB pe search kare
      onMovieRecommended(movieTitle);
      setMood(''); // Input clear karo
    } catch (err) {
      setError('AI se recommendation nahi mil payi. Dobara try karo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-matcher-container">
      <h3>✨ AI Mood Matcher</h3>
      <p>Apna mood likho, AI tumhare liye movie dhoond lega.</p>
      
      <form onSubmit={handleSubmit} className="mood-form">
        <input 
          type="text" 
          placeholder="e.g., I am feeling sad but want an action movie..." 
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          disabled={loading}
          className="mood-input"
        />
        <button type="submit" disabled={loading || !mood.trim()}>
          {loading ? 'Thinking...' : 'Find Movie'}
        </button>
      </form>
      {error && <p className="mood-error">{error}</p>}
    </div>
  );
};

export default MoodMatcher;

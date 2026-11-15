import { IMAGE_BASE_URL } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { toggleFav, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img 
          src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
          alt={movie.title} 
          className="movie-poster"
          loading="lazy" 
        />
      ) : (
        <div className="movie-poster-placeholder">No Poster Available</div>
      )}
      
      {/* Heart Button */}
      <button 
        className={`heart-btn ${isFav ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); // Card click event ko rokne ke liye
          toggleFav(movie);
        }}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
          <span className="movie-rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
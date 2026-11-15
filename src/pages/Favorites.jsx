import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2 style={{ padding: '20px 4%', fontSize: '1.5rem' }}>My Favorites</h2>
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
          You haven't added any movies to your favorites yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
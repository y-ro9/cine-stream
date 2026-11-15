import { createContext, useState, useEffect, useContext } from 'react';
import { getFavorites, toggleFavorite as toggleFavUtil } from '../utils/favorites';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Component mount hote hi localStorage se data uthao
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFav = (movie) => {
    const updatedFavs = toggleFavUtil(movie);
    setFavorites(updatedFavs);
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFav, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

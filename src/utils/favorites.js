export const getFavorites = () => {
  const favs = localStorage.getItem('cine_favorites');
  return favs ? JSON.parse(favs) : [];
};

export const toggleFavorite = (movie) => {
  let favs = getFavorites();
  const isFav = favs.some((f) => f.id === movie.id);

  if (isFav) {
    favs = favs.filter((f) => f.id !== movie.id);
  } else {
    favs.push(movie);
  }

  localStorage.setItem('cine_favorites', JSON.stringify(favs));
  return favs;
};

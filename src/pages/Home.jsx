import { useState, useEffect, useRef } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import { useDebounce } from '../hooks/useDebounce';
import MoodMatcher from '../components/MoodMatcher'; // Import

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const sentinelRef = useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // AI se aane wala result direct search bar mein feed karega
  const handleAIMovieRecommended = (movieTitle) => {
    setSearchQuery(movieTitle);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingInitial(true);
      setMovies([]);
      setPage(1);
      setError(null);
      
      try {
        let data;
        if (debouncedSearch.trim() === '') {
          data = await fetchPopularMovies(1);
        } else {
          data = await searchMovies(debouncedSearch, 1);
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchInitialData();
  }, [debouncedSearch]);

  useEffect(() => {
    if (page >= totalPages || loadingInitial || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [page, totalPages, loadingInitial, loadingMore, debouncedSearch]);

  const fetchNextPage = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      let data;
      
      if (debouncedSearch.trim() === '') {
        data = await fetchPopularMovies(nextPage);
      } else {
        data = await searchMovies(debouncedSearch, nextPage);
      }
      
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to fetch next page", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search movies..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* AI Mood Matcher Component */}
      <MoodMatcher onMovieRecommended={handleAIMovieRecommended} />

      {loadingInitial && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading Movies...</p>}
      {error && <p style={{ textAlign: 'center', color: '#e50914' }}>{error}</p>}
      
      {!loadingInitial && !error && (
        <>
          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>No movies found for this search.</p>
          )}

          <div ref={sentinelRef} className="sentinel">
            {loadingMore && <p>Loading more movies...</p>}
            {page >= totalPages && movies.length > 0 && <p>You have reached the end.</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
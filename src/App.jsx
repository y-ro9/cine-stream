import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext'; // Import
import './styles/global.css';

function App() {
  return (
    <FavoritesProvider> {/* Wrap entire app */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
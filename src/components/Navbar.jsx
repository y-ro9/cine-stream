import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CINE-STREAM</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">My Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
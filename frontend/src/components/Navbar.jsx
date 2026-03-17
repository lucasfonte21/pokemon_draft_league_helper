import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears the token from local storage
    navigate('/login'); // Kicks them back to the login screen
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem', 
      backgroundColor: '#2c3e50', 
      color: 'white',
      marginBottom: '20px'
    }}>
      {/* The Logo / App Name */}
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Draft League Helper
        </Link>
      </div>

      {/* The Dynamic Links */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            {/* What logged-in users see */}
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/create-league" style={{ color: 'white', textDecoration: 'none' }}>Create League</Link>
            <button 
              onClick={handleLogout} 
              style={{ cursor: 'pointer', background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' }}
            >
              Logout ({user.username})
            </button>
          </>
        ) : (
          <>
            {/* What guests see */}
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
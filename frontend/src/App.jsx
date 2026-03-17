import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth_context';

// Import the pages you built in Epic 3
import Navbar from './components/Navbar'; // <-- NEW IMPORT
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateLeague from './pages/Create_League';
import League_Details from './pages/League_Details';

function App() {
  // Bring in the user from your global state to protect private pages!
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          {/* Public Routes (If they are already logged in, push them to the dashboard) */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

          {/* Protected Routes (If they are NOT logged in, kick them back to the login page) */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-league" element={user ? <CreateLeague /> : <Navigate to="/login" />} />
          <Route path="/league/:id" element={user ? <League_Details /> : <Navigate to="/login" />} />

          {/* Catch-all: If they type a random URL, send them to the right place */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
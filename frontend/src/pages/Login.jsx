import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';

const Login = () => {
  // 1. Set up state for email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Bring in the 'login' function from context
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 3. Update state as the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 4. Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear out any old errors

    try {
      // Pass the email and password to the AuthContext
      await login(formData);
      
      // If the backend accepts it, teleport them to the dashboard!
      navigate('/dashboard'); 
    } catch (error) {
      // Show an error if they type the wrong password
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Log In to Draft League</h2>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
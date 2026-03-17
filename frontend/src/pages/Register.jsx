import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';

const Register = () => {
  // 1. Set up the state to hold the user's typing
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Bring in the 'register' function from your global AuthContext
  const { register } = useContext(AuthContext);
  
  // 3. Bring in 'navigate' so we can redirect them after they sign up
  const navigate = useNavigate();

  // 4. Update the state every time they type a letter
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 5. Handle the actual form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    setErrorMessage(''); // Clear any old errors

    try {
      // Pass the form data directly to your context function
      await register(formData);
      
      // If successful, send them to a dashboard page!
      navigate('/dashboard'); 
    } catch (error) {
      // If the backend throws an error (like "Email already exists"), show it on screen
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Sign Up for Draft League</h2>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="username"
          placeholder="Trainer Name (Username)"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
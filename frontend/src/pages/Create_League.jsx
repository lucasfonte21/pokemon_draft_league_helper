import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios_config';

const Create_League = () => {
  const [formData, setFormData] = useState({
    name: '',
    format: 'Standard Draft', // Default value for the dropdown
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Send the form data to your protected backend route
      await API.post('/leagues', formData);
      
      // If successful, instantly teleport the user back to their dashboard!
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to create league');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Create a New Draft League</h2>
      
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label style={{ fontWeight: 'bold' }}>League Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Paldea Season 1"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Format / Ruleset:</label>
          <select 
            name="format" 
            value={formData.format} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="Standard Draft">Standard Draft</option>
            <option value="Paldea Dex Only">Paldea Dex Only</option>
            <option value="National Dex">National Dex</option>
            <option value="VGC Doubles">VGC Doubles</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ marginTop: '10px', padding: '10px', background: '#9b59b6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Create League
        </button>
      </form>
    </div>
  );
};

export default Create_League;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios_config';

const League_Details = () => {
  // 1. Grab the ID out of the URL bar
  const { id } = useParams();

  // 2. Set up state for the specific league data
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Fetch the data when the page loads
  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await API.get(`/leagues/${id}`);
        setLeague(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load league details.');
        setLoading(false);
      }
    };

    fetchLeague();
  }, [id]); // This array ensures it re-runs if the ID in the URL ever changes

  // 4. Loading and Error states
  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Draft Board...</h2>;
  if (error) return <h2 style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</h2>;

  // 5. The Skeleton UI
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
        &larr; Back to Dashboard
      </Link>
      
      <div style={{ marginTop: '20px', padding: '25px', border: '1px solid #bdc3c7', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{league.name}</h1>
        <p style={{ fontSize: '1.1rem' }}><strong>Format:</strong> {league.format}</p>
        <p style={{ fontSize: '1.1rem' }}><strong>Commissioner:</strong> {league.commissioner.username}</p>
        
        <hr style={{ margin: '20px 0' }} />

        <h3 style={{ color: '#2980b9' }}>Draft Board</h3>
        <div style={{ padding: '40px', border: '2px dashed #ccc', textAlign: 'center', borderRadius: '8px', color: '#7f8c8d' }}>
          <em>(The interactive drafting grid and Pokemon selection will be built right here in Sprint 2!)</em>
        </div>

        <h3 style={{ marginTop: '30px', color: '#27ae60' }}>Players ({league.players.length})</h3>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px', fontSize: '1.1rem' }}>
          {league.players.map((player) => (
            <li key={player._id} style={{ marginBottom: '5px' }}>
              {player.username} {league.commissioner._id === player._id && "👑"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default League_Details;
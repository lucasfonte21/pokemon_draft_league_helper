import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios_config';
import { AuthContext } from '../context/auth_context';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  // 1. State to hold the data from the database
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Fetch the leagues the second the page loads
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        // Because of your interceptor, this automatically sends the user's token!
        const response = await API.get('/leagues');
        setLeagues(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load your leagues. Please try again later.');
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []); // The empty array [] means "only run this exactly once when the component first appears"

  // 3. What to show while waiting for the database to respond
  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading your leagues...</h2>;
  
  // 4. What to show if the server crashes
  if (error) return <h2 style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</h2>;

  // 5. What to show when the data successfully arrives
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h2>Welcome back, Trainer {user.username}!</h2>
      <hr style={{ marginBottom: '20px' }} />
      
      <h3>Your Active Draft Leagues</h3>

      {/* If the array is empty, tell them to create one! */}
      {leagues.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>You are not currently participating in any leagues.</p>
          <Link to="/create-league">
            <button style={{ padding: '10px 20px', cursor: 'pointer', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
              Create Your First League
            </button>
          </Link>
        </div>
      ) : (
        /* If they have leagues, map through the array and display each one in a card */
        <div style={{ display: 'grid', gap: '15px' }}>
          {leagues.map((league) => (
            <div key={league._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#f9f9f9' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>{league.name}</h4>
              <p style={{ margin: '5px 0' }}><strong>Format:</strong> {league.format}</p>
              <p style={{ margin: '5px 0' }}><strong>Commissioner:</strong> {league.commissioner.username}</p>
              
              <Link to={`/league/${league._id}`}>
                <button style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px' }}>
                  View Draft Board
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
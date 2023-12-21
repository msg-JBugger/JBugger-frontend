import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

function Dashboard() {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    const handleGetUsername = async () => {
      const jwt = localStorage.getItem('jwt'); // de schimbat asta
      axios.get(import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/user/name', { headers: {
        'Authorization': `Bearer ${jwt}`
      } })
      .then(function (response) {
        console.log(response.data);
        setUsername(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };
    handleGetUsername();
  }, []);



  return (
    <>
      <div className="container-fluid d-md-flex align-items-center justify-content-center vh-100 vw-100">
        <div>
          <button onClick={()=>handleLogout()} type="button" className="btn btn-dark">Logout</button>
        </div>
        <div>
          <p>Logged in as: {username}</p>
        </div>
      </div>
    </>
  )
}
  
  export default Dashboard
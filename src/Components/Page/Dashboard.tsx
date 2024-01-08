import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BugList from '../BugList';
import { BugData } from '../../Models/BugData';

function Dashboard() {
  const [bugs, setBugs] = useState<BugData>();
  const navigate = useNavigate();

  const pageNumberRef = useRef<HTMLInputElement>(null);
  const pageSizeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const versionRef = useRef<HTMLInputElement>(null);
  const fixedRevisionRef = useRef<HTMLInputElement>(null);
  const targetDateRef = useRef<HTMLInputElement>(null);
  const stautsRef = useRef<HTMLInputElement>(null);
  const severityRef = useRef<HTMLInputElement>(null);
  const reporterUsernameRef = useRef<HTMLInputElement>(null);
  const assigneeUsernameRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    fetchBugsFromBackend();
  }, []);

  const fetchBugsFromBackend = async () => {
    const jwt = localStorage.getItem('jwt');
    const filter = {
      pageNumber: 0,
      pageSize: 25,
      title: "",
      description: "",
      version: "",
      fixedRevision: "",
      targetDate: "",
      status: "",
      severity: "",
      reporterUsername: "",
      assigneeUsername: "",
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/bug/search',
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
          params: filter
        }
      );
      setBugs(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="login-background container-fluid d-md-flex align-items-center justify-content-center vh-100 vw-100">
      <nav className="navbar bg-white fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              {/* You can add links or other navigation items here */}
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="mt-5 text-center">
        <div className="mt-4">
          <BugList bugs={bugs?.items}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BugList from '../BugList';
import { BugData } from '../../Models/BugData';
import { ChangeEvent } from 'react';

function Dashboard() {
  const [bugs, setBugs] = useState<BugData>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    fetchBugsFromBackend();
  }, []);

  
  const [filter, setFilter] = useState({
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
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.id]: event.target.value });
  };

  const handleSearchClick = () => {
    fetchBugsFromBackend();
  };

  const fetchBugsFromBackend = async () => {
    const jwt = localStorage.getItem('jwt');
    
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
    <div>
      {/* Topbar */}
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

      {/* Sidebar */}
      <div className="col-md-2 p-0 position-fixed h-100" style={{ left: 0, top: 0 }}>
        <div className="bg-dark text-center h-100">
          <div className="p-4 d-flex flex-column justify-content-between">
            <div>
              <a href="#" className="btn btn-primary btn-sm mb-2 mt-5 w-75">
                Home
              </a>
              <a href="#" className="btn btn-primary btn-sm mb-2 w-75">
                About
              </a>
              <a href="#" className="btn btn-primary btn-sm mb-2 w-75">
                Services
              </a>
              <a href="#" className="btn btn-primary btn-sm mb-2 w-75">
                Contact
              </a>
            </div>
            <div className="mt-auto">
              {/* Additional content at the bottom if needed */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="login-background container-fluid d-md-flex align-items-center justify-content-center vh-100 vw-100">
        <div className="column">
          <div className="mt-3">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row mb-3 align-items-end">
                  <div className="col-md-2">
                    <label htmlFor="title" className="form-label" style={{ color: '#f0f0f0' }}>
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={filter.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="description" className="form-label" style={{ color: '#f0f0f0' }}>
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={filter.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="version" className="form-label" style={{ color: '#f0f0f0' }}>
                      Detected in Version
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="version"
                      value={filter.version}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="fixedRevision" className="form-label" style={{ color: '#f0f0f0' }}>
                      Fix Version
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fixedRevision"
                      value={filter.fixedRevision}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="targetDate" className="form-label" style={{ color: '#f0f0f0' }}>
                      Target Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="targetDate"
                      value={filter.targetDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-4 align-items-end">
                  <div className="col-md-2">
                    <label htmlFor="status" className="form-label" style={{ color: '#f0f0f0' }}>
                      Status
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      value={filter.status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="severity" className="form-label" style={{ color: '#f0f0f0' }}>
                      Severity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="severity"
                      value={filter.severity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="reporterUsername" className="form-label" style={{ color: '#f0f0f0' }}>
                      Reporter Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="reporterUsername"
                      value={filter.reporterUsername}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="asigneeUsername" className="form-label" style={{ color: '#f0f0f0' }}>
                      Assignee Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="assigneeUsername"
                      value={filter.assigneeUsername}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='col'>
                    <button className="btn btn-primary" onClick={handleSearchClick}>
                    Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <div className="mt-4">
              <BugList bugs={bugs?.items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { BugDetailsData } from '../../Models/BugDetailsData';

function Dashboard() {
  const navigate = useNavigate();
  const { bugId } = useParams();
  const [bugDetails, setBugDetails] = useState<BugDetailsData>();

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    const fetchBugDetails = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/bug/${bugId}`,
            {
                headers: {
                Authorization: "Bearer " + jwt,
                },
            }
          );

        setBugDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching bug details:', error);
      }
    };

    fetchBugDetails();
  }, [bugId]);
  
  return (
    <div className="login-background container-fluid d-md-flex vh-100 vw-100">
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

      {/* Bug Details Section */}
      <div className="vh-100 vw-100">
        <div className="small-background">
          <div className="bug-title">
            <p style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.title}</p>
          </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Fixed Revision:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.fixedRevision}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Severity:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.severity}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0'}}>Target Date:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.targetDate}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Version:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.version}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Status:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.status}</label>
                </div>
                
              </div>
              <div className="col-md-4">
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Reporter Username:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.reporterUsername}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Assignee Username:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.assigneeUsername}</label>
                </div>
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Description:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.description}</label>
                </div>
              </div>
              <div className="col">
              <div className="col">
                <div className="container">
                  <div className="rectangular-box">
                    <p>
                      TEXT
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="container">
                  <div className="rectangular-box">
                    <p>
                      TEXT
                    </p>
                  </div>
                </div>
              </div>
              </div>
              <div className="row">
                <div className='my-button-group'>
                  <button type="button" className="btn btn-primary btn-lg my-custom-button">Download Attachements</button>
                  <button type="button" className="btn btn-primary btn-lg my-custom-button">Add Attachment</button>
                  <button type="button" className="btn btn-danger btn-lg my-custom-button-danger">Close Bug</button>
                </div>
              </div>
              
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

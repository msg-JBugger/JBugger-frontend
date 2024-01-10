import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { BugDetailsData } from '../../Models/BugDetailsData';
import fetchBugsFromBackend from './Dashboard';

function Dashboard() {
  const navigate = useNavigate();
  const { bugId } = useParams();
  const [bugDetails, setBugDetails] = useState<BugDetailsData>();

  // State info for editing
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState({
    title: '',
    description: '',
    version: '',
    fixedRevision: '',
    targetDate: '',
    severity: '',
    status: '',
    reporterUsername: '',
    assigneeUsername: '',
  });

  const updateBug = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await axios.put(
        import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/bug/update/${bugId}`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
          params: {
            title: bugDetails?.bugAttributes.title,
            description: fields.description,
            detectedInVersion: fields.version,
            fixedInVersion: fields.fixedRevision,
            targetDate: fields.targetDate,
            severity: fields.severity,
            status: fields.status,
            assigneeUsername: fields.assigneeUsername,
          }
        }
      );

      console.log('UPDATE RESPONSE: ' + response.status);
      console.log('UPDATE DATA: ' + fields.description);
      // fetchBugsFromBackend();
    } catch (error) {
      console.error('Error updating bug details:', error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      updateBug();
    }

    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditing) {
      const id = event.currentTarget.id;
      const value = event.currentTarget.value;
      setFields((prev) => ({ ...prev, [id]: value }));
    }
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

  // Initialize fields
  useEffect(() => {
    setFields({
      title: bugDetails?.bugAttributes.title || '',
      fixedRevision: bugDetails?.bugAttributes.fixedRevision || '',
      severity: bugDetails?.bugAttributes.severity.toString() || '',
      targetDate: bugDetails?.bugAttributes.targetDate || '',
      version: bugDetails?.bugAttributes.version || '',
      status: bugDetails?.bugAttributes.status.toString() || '',
      reporterUsername: bugDetails?.bugAttributes.reporterUsername || '',
      assigneeUsername: bugDetails?.bugAttributes.assigneeUsername || '',
      description: bugDetails?.bugAttributes.description || '',
    });
  }, [bugDetails]);

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
                <br/>
                <input
                  id="fixedRevision"
                  type="text"
                  value={fields.fixedRevision || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.fixedRevision}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Severity:</label>
                <br/>
                <input
                  id="severity"
                  type="text"
                  value={fields.severity || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.severity}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Target Date:</label>
                <br/>
                <input
                  id="targetDate"
                  type="text"
                  value={fields.targetDate || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.targetDate}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Version:</label>
                <br/>
                <input
                  id="version"
                  type="text"
                  value={fields.version || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.version}</label> */}
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Status:</label>
                <br/>
                <input
                  id="status"
                  type="text"
                  value={fields.status || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.status}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Reporter Username:</label>
                <br/>
                <input
                  id="reporterUsername"
                  type="text"
                  value={fields.reporterUsername || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.reporterUsername}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Assignee Username:</label>
                <br/>
                <input
                  id="assigneeUsername"
                  type="text"
                  value={fields.assigneeUsername || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.assigneeUsername}</label> */}
              </div>
              <div className="form-group my-custom-label">
                <label style={{ color: '#f0f0f0' }}>Description:</label>
                <br/>
                <input
                  id="description"
                  type="text"
                  value={fields.description || ''}
                  onChange={handleInputChange}
                />
                {/* <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.description}</label> */}
              </div>
            </div>
            <div className="col">
              <div className="col" style={{ height: '400px' }}>
                <div className="container h-100">
                  <div className="rectangular-box" style={{ height: '100%' }}>
                    <p>
                      HISTORY
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col">
                <div className="container">
                  <div className="rectangular-box">
                    <p>
                      COMMENTS
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className='my-button-group'>
                <button type="button" className="btn btn-primary btn-lg my-custom-button">Download Attachements</button>
                <button type="button" className="btn btn-primary btn-lg my-custom-button">Add Attachment</button>

                {/* Conditionally rendering (Edit Button / Save Changes) button based on edit mode */}
                {!isEditing ? (
                  <button type="button" className="btn btn-primary btn-lg my-custom-button" onClick={handleEdit}>
                    Edit Bug
                  </button>
                ) : (
                  <button type="button" className="btn btn-success btn-lg my-custom-button-green" onClick={handleEdit}>
                    Save Changes
                  </button>
                )}

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

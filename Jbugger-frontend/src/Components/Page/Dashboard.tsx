import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BugData } from '../../Models/BugData';
import { ChangeEvent } from 'react';
import { jwtDecode } from 'jwt-decode'
import  { JwtPayload } from 'jwt-decode';
import Navbar from '../Navbar';
import BugList from '../BugList';

function Dashboard() {
  const jwt = localStorage.getItem('jwt');

  const [bugs, setBugs] = useState<BugData>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    fetchBugsFromBackend();
  }, []);

  const fetchJWTDetails = async () => {
    return new Promise( async (resolve, reject) => {
      try {
        if (jwt) {
          const decodedToken = jwtDecode(jwt) as JwtPayload;
          resolve(decodedToken.sub);
        }
      } catch (error) {
        console.error('Error fetching jwt username:', error);
        reject(error);
      }
    });
  };

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

  const [addFields, setFields] = useState({
    title: '',
    description: '',
    detectedInVersion: '',
    fixedInVersion: '',
    targetDate: '',
    severity: '',
    assigneeUsername: '',
    attachmentFilename: null,
    attachmentContent: null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.id]: event.target.value });
  };

  const handleSearchClick = () => {
    fetchBugsFromBackend();
  };

  const handleFieldInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;
    const value = event.currentTarget.value;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  // const addBug = async () => {
  //   try {
  //     const username = await fetchJWTDetails();
  //     const response = await axios.post(
  //       import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/bug/add/${username}`,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + jwt,
  //         },
  //         params: addFields
  //       }
  //     );
  //     console.log(response.data);
  //     fetchBugsFromBackend();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addBug = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const username = await fetchJWTDetails();
        const response = await axios.post(
          import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/bug/add?username=${username}`,
          addFields,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
            params: addFields
          }
        );
        console.log(response.data);
        console.log('RESPONSE CODE: ' + response.status.toString());
        fetchBugsFromBackend();
        resolve(response.data);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const handleAddBug = () => {
    console.log("Adding bug...");
    
    // Send the request to the backend
    addBug();

    // Reset the fields
    setFields({
      title: '',
      description: '',
      detectedInVersion: '',
      fixedInVersion: '',
      targetDate: '',
      severity: '',
      assigneeUsername: '',
      attachmentFilename: null,
      attachmentContent: null,
    });
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

      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <Navbar></Navbar>

          <div className="col-md-10 offset-md-2 p-0 login-background container d-md-flex align-items-left justify-content-top vh-300">
            <div className="container">

              <div style={{height: 100}}></div>

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
                      <div className='col-md-2'>
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

              <div>
                {/* Add Bug */}

                {/* This div is for spacing */}
                <div style={{height: 20}}></div>

                <label style={{ color: '#f0f0f0', fontSize: 40 }}>Add Bug</label>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Title:</label>
                      <br />
                      <input
                        id="title"
                        type="text"
                        value={addFields.title || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Description:</label>
                      <br />
                      <input
                        id="description"
                        type="text"
                        value={addFields.description || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Detected in version:</label>
                      <br />
                      <input
                        id="detectedInVersion"
                        type="text"
                        value={addFields.detectedInVersion || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Fixed in version:</label>
                      <br />
                      <input
                        id="fixedInVersion"
                        type="text"
                        value={addFields.fixedInVersion || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Target Date:</label>
                      <br />
                      <input
                        id="targetDate"
                        type="text"
                        value={addFields.targetDate || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Severity:</label>
                      <br />
                      <input
                        id="severity"
                        type="text"
                        value={addFields.severity || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                    {/* <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Status:</label>
                      <br />
                      <input
                        id="status"
                        type="text"
                        value={fields.status || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div> */}
                    {/* <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Reporter Username:</label>
                      <br />
                      <input
                        id="reporterUsername"
                        type="text"
                        value={fields.reporterUsername || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div> */}
                    <div className="form-group my-custom-label">
                      <label style={{ color: '#f0f0f0' }}>Assignee Username:</label>
                      <br />
                      <input
                        id="assigneeUsername"
                        type="text"
                        value={addFields.assigneeUsername || ''}
                        onChange={handleFieldInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div style={{height: 30}}></div>
                <button type="button" className="btn btn-success btn-lg my-custom-button-green" onClick={handleAddBug}>
                  Save Bug
                </button>
                <div style={{height: 30}}></div>

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
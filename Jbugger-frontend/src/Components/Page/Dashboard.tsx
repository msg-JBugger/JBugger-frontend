import { useState, useEffect } from 'react';
import axios from 'axios';
import { BugData } from '../../Models/BugData';
import { ChangeEvent } from 'react';
import BugList from '../BugList';
import { jwtDecode } from 'jwt-decode'
import  { JwtPayload } from 'jwt-decode';
import { User } from '../../Models/User';
import { PermissionEnum } from '../../Models/Enums/PermissionEnum';

function Dashboard() {
  const [bugs, setBugs] = useState<BugData>();
  const jwt = localStorage.getItem('jwt');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasAddBugPermission, setAddBugPermission] = useState(false);

  const [extraSpace, setExtraSpace] = useState("col-md-10 offset-md-2 p-0 login-background container d-md-flex align-items-center justify-content-center vh-100");

  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetchJWTDetails();
    fetchBugsFromBackend();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      const userPermissions = user?.roles
      ? [...user.roles]
          .flatMap((role) => [...role.permissions].map((p) => p.type))
          .filter((permission) => Object.values(PermissionEnum).includes(permission))
      : [];
      const found = userPermissions.find(obj => {
         return obj.toString() === "BUG_MANAGEMENT"
       }
       )
       if(found){
        setAddBugPermission(true);
        setExtraSpace("col-md-10 offset-md-2 p-0 login-background container d-md-flex align-items-center justify-content-center vh-300")
       }
      console.log(hasAddBugPermission);
    }
  }, [user]); 

  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 25,
    title: "",
    description: "",
    detectedInVersion: "",
    fixedInVersion: "",
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

  const handleFieldInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;
    const value = event.currentTarget.value;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearchClick = () => {
    fetchBugsFromBackend();
  };

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

  const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await fetchUserFromDatabase();
        setUser(userData as User);
        resolve(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        reject(error);
      }
    });
  };

  const fetchUserFromDatabase = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const username = await fetchJWTDetails();
        const response = await axios.get(
          import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/user/${username}`,
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
  
        resolve(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        reject(error);
      }
    });
  };

  const fetchBugsFromBackend = () => {
    return new Promise(async (resolve, reject) => {
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
        console.log(response.data);
  
        resolve(response.data);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

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
    
    setIsFormOpen(false);
  };
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}  
            <div className={`${extraSpace}`}>
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
                            value={filter.detectedInVersion}
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
                            value={filter.fixedInVersion}
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
                {
                  hasAddBugPermission &&
                  <div >
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
                }
                
              </div>  
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Dashboard;
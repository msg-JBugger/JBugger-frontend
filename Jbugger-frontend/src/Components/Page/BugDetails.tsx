import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { BugDetailsData } from '../../Models/BugDetailsData'
import { jwtDecode } from 'jwt-decode'
import  { JwtPayload } from 'jwt-decode';
import { User } from '../../Models/User';
import { PermissionEnum } from '../../Models/Enums/PermissionEnum';
import AddComment from '../comment/AddComment';
import CommentList from '../comment/CommentList';
import { Comment } from '../../Models/Comment';

function Dashboard() {
  const navigate = useNavigate();
  const { bugId } = useParams();
  const [bugDetails, setBugDetails] = useState<BugDetailsData>();
  const [user, setUser] = useState<User>();
  const [hasCloseBugPermissoin, setCloseBugPermission] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const [comments, setComments] = useState<Comment[]>();

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
    } catch (error) {
      console.error('Error fetching bug details:', error);
    }
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

  const handleChanges = () => {
    fetchBugComments();
  };

  const fetchBugComments = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/comments/${bugId}`,
          {
              headers: {
              Authorization: "Bearer " + jwt,
              },
          }
        );

      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching bug details:', error);
    }
  };

  useEffect(() => {
    fetchBugComments();
  }, [bugId]);

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

  const handleCloseBug = async () => {
    try {
      await axios.patch(
        import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/bug/close/${bugId}`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        },
      );
      navigate("/dashboard")
    } catch (error) {
      console.error('Error closing bug:', error);
    }
  };

  useEffect(() => {
    fetchBugDetails();
    fetchJWTDetails();
    fetchUserFromDatabase();
    fetchUser();
  }, [bugId]);

  useEffect(() => {
    if (user) {
      console.log(user);
      const userPermissions = user?.roles
      ? [...user.roles]
          .flatMap((role) => [...role.permissions].map((p) => p.type))
          .filter((permission) => Object.values(PermissionEnum).includes(permission))
      : [];
      const found = userPermissions.find(obj => {
         return obj.toString() === "BUG_CLOSE"
       }
       )
       if(found){
        setCloseBugPermission(true);
       }
      console.log(hasCloseBugPermissoin);
    }
  }, [user]); // Run this effect when the user state changes

  
  return (
    <div className="login-background container-fluid d-md-flex col-md-10 offset-md-2 vh-100">
      {/* Bug Details Section */}
      <div className="vh-100 vw-100">
        <div className="small-background">
          <div className="bug-title">
            <p style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.title}</p>
          </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group my-custom-label">
                  <label style={{ color: '#f0f0f0' }}>Fixed In Version:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.fixedInVersion}</label>
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
                  <label style={{ color: '#f0f0f0' }}>Detected In Version:</label>
                  <label style={{ color: '#f0f0f0' }}>{bugDetails?.bugAttributes.detectedInVersion}</label>
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
                  {
                  hasCloseBugPermissoin &&
                  <button
                    type="button"
                    className="btn btn-danger btn-lg my-custom-button-danger"
                    onClick={handleCloseBug}
                    >Close Bug
                  </button>
                  }
                  <div>
                    <div><AddComment bugId={Number(bugId)} onChange={handleChanges}/></div>
                    <div><CommentList comments={(typeof comments !== 'undefined') ? comments : []}/></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

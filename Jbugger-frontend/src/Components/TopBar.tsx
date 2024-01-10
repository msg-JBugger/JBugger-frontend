import { useNavigate } from 'react-router-dom';

function TopBar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('jwt');
        navigate('/login');
      };

    return(
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
        <div className="mr-100">
            <div>
              Signed in as:
            </div>
          </div>
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    )
   
}
export default TopBar;
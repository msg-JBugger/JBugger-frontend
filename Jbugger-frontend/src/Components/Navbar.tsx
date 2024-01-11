import {Button, Col, Form, InputGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {



  const navigate = useNavigate();

  const handleUserManagement = async () => {
    navigate("/user-management")
  };



    return (
        <div className="col-md-2 position-fixed h-100 p-0" style={{ top: 0, left: 0 }}>
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
                <Button className="btn btn-primary btn-sm mb-2 w-75" onClick={handleUserManagement}>
                  User management
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
}
export default Navbar;
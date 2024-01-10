import { useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginCheck } from '../LoginCheck';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import { axiosInterface } from "../../API/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (LoginCheck() == true) {
      navigate('/dashboard');
    }
}, []);

  const handleLogin = async () => {
    if(usernameRef.current == null || passwordRef.current == null) {
      return;
    }
    console.log("Username:", usernameRef.current.value);
    console.log("Password:", passwordRef.current.value);
    const credentials = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    await axiosInterface.post('/auth/login', credentials)
    .then(function (response) {
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem('jwt', token); // DE SCHIMBAT ASTA !!
      navigate('/dashboard');
    })
    .catch(function (error) {
      console.log(error);
      alert('Login failed.');
    });
  };
  
  return (
    <>
      <div className="login-background container-fluid d-md-flex align-items-center justify-content-center vh-100 vw-100">
        <form className="flex-fill">
          <div className="container text-center">
            <div className="row mb-5 mt-8">
              <div className="offset-md-3 col-6 text-white font-inter"> {/* Add text-white class here */}
                <h3 className="h3-styling">Welcome to</h3>
                <h1 className="h1-styling">JBugger</h1>
              </div>
            </div>
            <div className="row mb-3 mt-3">
              <div className="offset-md-3 col-6">
                <input ref={usernameRef} type="text" className="form-control form-control-lg font-inter input-field" placeholder="Username" aria-describedby="inputGroup-sizing-sm" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="offset-md-3 col-6">
                <input ref={passwordRef} type="password" className="form-control form-control-lg font-inter input-field" placeholder="Password" aria-describedby="inputGroup-sizing-sm" />
              </div>
            </div>
            <div className="row">
              <div className="offset-md-4 col-4">
                <button onClick={() => handleLogin()} type="button" className="btn btn-lg login-button font-inter">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );  
}

export default Login
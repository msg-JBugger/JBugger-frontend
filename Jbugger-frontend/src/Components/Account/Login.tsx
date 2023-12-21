import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {BACKEND_URL} from '../../constants.ts'

export const Login = () => {

  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", passwd);
  
    axios.post(BACKEND_URL+'/login', {
      username: username,
      password: passwd
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  return (
    <>
    <div className="login-page" 
    style={{border: '0', margin: '0', height: '100vh', background: 'linear-gradient(104deg, #2A2099 0%, rgba(150.26, 86.06, 255, 0) 100%, rgba(157.57, 104.88, 244.37, 0.01) 100%)'}}>
        <form className="flex flex-col [&>*]:m-6 mt-[10rem]" onSubmit={handleLogin}>
            <div>
              <input 
                id="username" 
                type="text" 
                placeholder='Username'
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                className="outline outline-4 p-2 outline-[rgb(243,236,224)] rounded-xl h-10" />
            </div>
            <div>
              <input 
                id="password" 
                type="password" 
                placeholder='Password'
                name="password"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                className="outline outline-4 p-2 outline-[rgb(243,236,224)] rounded-xl h-10" />
            </div>
            <div><button type="submit" className="transition duration-300 ease-out rounded-full w-24 h-12 bg-indigo-600 hover:bg-indigo-800 shadow-[0px_10px_0px_rgba(79,70,229,0.25)] hover:shadow-[0px_10px_0px_rgba(50,37,95,0.65)] hover:drop-shadow-[0_0px_5px_rgba(79,70,229,0.75)] font-bold">Login</button></div>
        </form>
        </div>
    </>
  )
}

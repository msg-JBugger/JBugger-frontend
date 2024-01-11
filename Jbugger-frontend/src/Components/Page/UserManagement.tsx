import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import UserList from '../UserList';
import { User } from '../../Models/User';
import axios from 'axios';
import { useEffect } from 'react';
import { RolesEnum } from '../../Models/Enums/RolesEnum';
import { Dropdown } from 'react-bootstrap';

function UserManagement() {

    const [users, setUsers] = useState<User[]>();

    const [selectedRoles, setSelectedRoles] = useState<RolesEnum[]>([]);

    useEffect(() => {
        fetchUsersFromBackend();
    }, []);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setlastName] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const handleAddUser = async () => {
    const jwt = localStorage.getItem('jwt');

    try {
      await axios.post(
        import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/user/add',
        {
          
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          email: email,
          roles: selectedRoles,
        },
        {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        }
      );
      fetchUsersFromBackend();
    }
    catch(error) {
        console.log(error);
    }
}

const handleChanges = () => {
    // Your logic to deactivate the user and trigger a data fetch
    // For now, let's just log the details
    // console.log(`Deactivating user and triggering data fetch: ${username}`);
    fetchUsersFromBackend(); // Trigger data fetch after deactivating the user
  };


    const fetchUsersFromBackend = async () => {
        const jwt = localStorage.getItem('jwt');

        try {
            const response = await axios.get(
                import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/user/findAll',
                {
                    headers: {
                        Authorization: "Bearer " + jwt,
                    },
                }
            );
            console.log(response.data)
            setUsers(response.data);

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div>
            {/* Topbar */}

            <div className="container-fluid">
                <div className="row">
                    {/* Main Content */}

                    <div className="col-md-10 offset-md-2 p-0 login-background container d-md-flex align-items-center justify-content-center vh-100">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="row mb-3 align-items-end">
                                            <div className="col-md-2">
                                                <label htmlFor="FirstName" className="form-label" style={{ color: '#f0f0f0' }}>
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="FirstName"
                                                    onInput={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="LastName" className="form-label" style={{ color: '#f0f0f0' }}>
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="LastName"
                                                    onInput={(e) => setlastName(e.target.value)}
                                                />
                                            </div>
                            
                                            <div className="col-md-3">
                                                <label htmlFor="Mobile" className="form-label" style={{ color: '#f0f0f0' }}>
                                                    Phone number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Mobile"
                                                    onInput={(e) => setMobileNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="email" className="form-label" style={{ color: '#f0f0f0' }}>
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    onInput={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Select Options
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {Object.values(RolesEnum).map((option, index) => (
                                                        <Dropdown.Item
                                                            key={index}
                                                            onClick={() => {
                                                                if (selectedRoles.includes(option)) {
                                                                    setSelectedRoles(selectedRoles.filter((role) => role !== option));
                                                                } else {
                                                                    setSelectedRoles([...selectedRoles, option]);
                                                                }
                                                                console.log(selectedRoles);
                                                            }}
                                                        >
                                                            {option}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <div>
                                                <strong>Selected Options:</strong> {selectedRoles.join(', ')}
                                            </div>
                                        </div>
                                        <div className='col-md-2'>
                                            <button className="btn btn-primary" onClick={handleAddUser}>
                                                Add user
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <div className="mt-4">
                                    <UserList users={users} onChange={handleChanges} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserManagement
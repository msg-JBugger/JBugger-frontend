import React, { useState } from 'react';
import { User } from '../Models/User';
import { RolesEnum } from '../Models/Enums/RolesEnum';
import { useEffect } from 'react';
import axios from 'axios';

interface UserListProps {
    users: User[] | undefined;
    onChange: () => void;
}

const joinRolesToString = (roles: authorities[]): string => {
    let allAuthorities = '';
    roles.forEach((authority) => {
        allAuthorities += RolesEnum[authority['authority']] + ', ';
    });

    return allAuthorities.slice(0, -2);
};

const UserList: React.FC<UserListProps> = ({ users, onChange }) => {
    console.log(users);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editedUsers, setEditedUsers] = useState<User[]>([]);


    const handleEditClick = (index: number) => {
        if (editMode === index) {
            // Save changes
            setEditMode(null);
            setEditedUsers((prevEditedUsers) => {
                const newEditedUsers = [...prevEditedUsers];
                newEditedUsers[index] = users![index];
                return newEditedUsers;
            });
        } else {
            // Enter edit mode
            setEditMode(index);
        }
    };

    const generateAuthorities = (authorities: string) => {
        const myArray = authorities.split(',');
            let generatedAuthorities: RolesEnum[] = [];
            myArray.forEach(element => {
                generatedAuthorities.push(RolesEnum[element]);
            });
            console.log(generatedAuthorities);
            return generatedAuthorities;
    }

    const handleInputChange = (index: number, property: keyof User, value: string) => {
        setEditedUsers((prevEditedUsers) => {
            const newEditedUsers = [...prevEditedUsers];
            newEditedUsers[index] = { ...newEditedUsers[index], [property]: value };
            return newEditedUsers;
        });
    };

    const handleCancelClick = (index: number) => {
        // Cancel changes and exit edit mode
        setEditMode(null);
        setEditedUsers((prevEditedUsers) => {
            const newEditedUsers = [...prevEditedUsers];
            newEditedUsers[index] = users![index];
            return newEditedUsers;
        });
    };



    const handleUpdate = async (index: number, username: string) => {
        const jwt = localStorage.getItem('jwt');

        try {

            console.log(editedUsers[index]);
            await axios.put(
                import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/user/update/' + username,
                {
                    mobile: editedUsers[index].mobileNumber,
                    email: editedUsers[index].email,
                    roles: generateAuthorities(editedUsers[index].authorities),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + jwt,
                    },
                }
            );
             onChange();   
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSaveClick = (index: number, username: string) => {
        setEditMode(null);
        handleUpdate(index, username);
        setEditedUsers([]);
    };

    const renderTableCell = (index: number, property: keyof User, value: string) => {
        const disabledProperties: (keyof User)[] = ['username', 'firstName', 'lastName', 'enabled'];

        return editMode === index ? (
            <input
                type="text"
                value={editedUsers[index]?.[property] || ''}
                onChange={(e) => handleInputChange(index, property, e.target.value)}
                disabled={disabledProperties.includes(property)} // Disable input for username, first name, and last name
            />
        ) : (
            value
        );
    };

    const tableRows: JSX.Element[] = [];

    const generateTable = () => {
        if (users != null) {
            users.forEach((user, index) => {
                tableRows.push(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{renderTableCell(index, 'firstName', user.firstName)}</td>
                        <td>{renderTableCell(index, 'lastName', user.lastName)}</td>
                        <td>{renderTableCell(index, 'username', user.username)}</td>
                        <td>{renderTableCell(index, 'mobileNumber', user.mobileNumber)}</td>
                        <td>{renderTableCell(index, 'email', user.email)}</td>
                        <td>{renderTableCell(index, 'authorities', joinRolesToString(user.authorities))}</td>
                        <td>
                            {editMode === index ? (
                                <>
                                    <button onClick={() => handleSaveClick(index, user.username)}>Save</button>
                                    <button onClick={() => handleCancelClick(index)}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(index)}>Edit</button>
                            )}
                        </td>
                        <td>
                            <button onClick={() => user.enabled ? handleDeactivateClick(user.username) : handleDeactivateClick(user.username)}>
                                {user.enabled ? 'Deactivate' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    };

    const handleDeactivateClick = async (username: string) => {
            const jwt = localStorage.getItem('jwt');
    
            try {
                const response = await axios.delete(
                    import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + 'api/user/deactivate/' + username,
                    {
                        headers: {
                            Authorization: "Bearer " + jwt,
                        },
                    }
                );
                console.log(response.data)
                onChange();
            } catch (error) {
                console.log(error);
            }
            
        };

    // const handleActivateClick = (index: number, username: string) => {
    //     console.log(`Deactivating user: ${username}`);
    // };

    generateTable();


    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nr. Crt</th>
                            <th>First name</th>
                            <th>Surname</th>
                            <th>Username</th>
                            <th>Mobile number</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Action</th>
                            <th>Deactivate/Activate</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;

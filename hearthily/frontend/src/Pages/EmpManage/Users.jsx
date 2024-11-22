import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Report from "../EmpManage/Report";
import '../../css/Employee CSS/user.css'
import '../../../src/App.css'
import QRCode from 'qrcode.react';

function Users() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showQRCode, setShowQRCode] = useState(false); // State to manage QR code visibility

    useEffect(() => {
        axios.get("http://localhost:3500/EmpReg")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3500/EmpReg/deleteUser/${id}`)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };
    
    const filteredData = users.filter(item => {
        if (!searchTerm) return true;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some(val => {
            if (val !== null && val !== undefined) {
                const lowerVal = String(val).toLowerCase();
                return lowerVal.includes(lowerSearchTerm);
            }
            return false; 
        });
    });

    const toggleQRCode = () => {
        setShowQRCode(!showQRCode); // Toggle QR code visibility
    };

    return (
        
        <div className="emp-users-container">
           
           <div className="emp-users-content">

           <div className="hh"> <h1>Employee Management </h1> </div>

           <div>
           
           </div>
                <div className="emp-search-bar">
                    <input
                        onChange={(event) => {
                            console.log("Search Term:", event.target.value); 
                            setSearchTerm(event.target.value);
                        }}
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                

                <div></div>
                
                <div className="emp-add-button">
                    
                
                <div className="emp-bottom-buttons">
                <Link to="/create">Add +</Link>

                <Link to={'/CalculateSalary'}>
                    <button>Calculate Salary</button>
                 </Link>

                    {/* Button to toggle QR code visibility */}
                    <button onClick={toggleQRCode}>Attendance</button>
                    {/* Render QR code conditionally */}
                    {showQRCode && (
                        <div>
                            <p>Scan the QR code to mark Attendence:</p>
                            <QRCode value="http://localhost:3000/leave" />
                        </div>
                    )}

                                    <Link to={`/leave_Details`}>
                                        <button>Leave Details</button>
                                    </Link>
                    
                </div>
                </div>
                <table className="emp-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>emp Id</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Start Date</th>
                            <th>Job Role</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr key={user._id}> 
                                <td>{user.name}</td>
                                <td>{user.empNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.startDate}</td>
                                <td>{user.jobRole}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td>
                                <Link to={`/update-user/${user._id}`}>
                                        <button className="edit-button">Edit</button>
                                    </Link>
                                    
                                    <button className="delete-button" onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    
                                        
                                        <Link to={`/leaving-form/${user._id}`}>
                                            <button className="leave-button">Leave</button>
                                        </Link>
                                        

                                    
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>              
              
                <Report />
               
            </div>
        </div>
    );
}

export default Users;

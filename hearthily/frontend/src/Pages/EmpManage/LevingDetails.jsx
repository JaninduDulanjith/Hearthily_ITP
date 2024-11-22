import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../css/Employee CSS/LeavingDetails.css'

function LeaveDetails() {
    const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        // Fetch leave details from the backend when the component mounts
        axios.get("http://localhost:3500/leave/get")
            .then(response => {
                setLeaveData(response.data);
            })
            .catch(error => {
                console.error("Error fetching leave details:", error);
            });
    }, []);

    return (
        <div className="emp-container">
            
            <h1>Leave Details</h1>
            
            <table className="emp-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveData.map((leave, index) => (
                        <tr key={index}>
                            <td>{leave.empNumber}</td>
                            <td>{leave.name}</td>
                            <td>{new Date(leave.date).toLocaleDateString()}</td>
                            <td>{leave.reason}</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            
            <Link to={`/users`}>
                 <button className="back" >Back to User</button>
            </Link>
        </div>
    );
}

export default LeaveDetails;

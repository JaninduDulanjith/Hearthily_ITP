import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../css/Employee CSS/CalculateSalary.css'

function Calculate() {
    const [users, setUsers] = useState([]);
    const [leaveCounts, setLeaveCounts] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3500/EmpReg")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));

        axios.get("http://localhost:3500/leave/getCount")
            .then(result => {
                const counts = {};
                result.data.forEach(item => {
                    counts[item._id] = item.totalEntries;
                });
                setLeaveCounts(counts);
            })
            .catch(err => console.log(err));
    }, []);

    const calculateBasicSalary = (jobRole) => {
        switch (jobRole) {
            case "Head Cook":
                return 50000;
            case "Driver":
                return 40000;
            case "Dish Washer":
                return 15000;
            case "Helper":
                return 10000;
            case "Quality Check":
                return 35000;
            case "Cook 2":
                return 30000;
            default:
                return 0;
        }
    };

    const calculateEPF = (basicSalary) => {
        return basicSalary * 0.03;
    };

    const calculateETF = (basicSalary) => {
        return basicSalary * 0.15;
    };

    const calculateTotalSalary = (basicSalary, leaveCount) => {
        // Check if leaveCount is undefined and default it to 0
        if (leaveCount === undefined) {
            leaveCount = 0;
        }
        const totalDeduction = (basicSalary / 30) * leaveCount + calculateEPF(basicSalary) + calculateETF(basicSalary);
        return basicSalary - totalDeduction;
    };

    return (
        <div>
            <h1>Salary Details</h1>
            <table className="emp-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Emp Id</th>
                        <th>Basic Salary(LKR)</th>
                        <th>Leaves</th>
                        <th>Job Role</th>
                        <th>EPF(LKR)</th>
                        <th>ETF(LKR)</th>
                        <th>Total Salary(LKR)</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}> 
                            <td>{user.name}</td>
                            <td>{user.empNumber}</td>
                            <td>{calculateBasicSalary(user.jobRole)}</td>
                            <td>{leaveCounts[user.empNumber] ?? 0}</td>
                            <td>{user.jobRole}</td>
                            <td>{calculateEPF(calculateBasicSalary(user.jobRole)).toFixed(2)}</td>
                            <td>{calculateETF(calculateBasicSalary(user.jobRole)).toFixed(2)}</td>
                            <td>{calculateTotalSalary(calculateBasicSalary(user.jobRole), leaveCounts[user.empNumber]).toFixed(2)}</td>
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

export default Calculate;

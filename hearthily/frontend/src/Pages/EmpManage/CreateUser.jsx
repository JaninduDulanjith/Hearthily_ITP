import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "C:/Users/janin/Desktop/DuviniITP/hearthily/frontend/src/css/Employee CSS/createUser.css";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [empNumber, setEmpNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateAge = (age) => {
        return /^\d+$/.test(age) && parseInt(age) > 0;
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };

    const validateStartDate = (startDate) => {
        const today = new Date();
        const startDateValue = new Date(startDate);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(today.getDate() - 14);
        return startDateValue <= today && startDateValue >= twoWeeksAgo;
    };
    
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };
    
        switch (name) {   
            case "name":
                newErrors.name = value.trim() ? "" : "Name is required";
                break;
            case "id":
                newErrors.id = value.trim() ? "" : "Emp No is required";
                break;
            case "email":
                newErrors.email = value.trim() ? (validateEmail(value) ? "" : "Invalid email format") : "Email is required";
                break;
            case "age":
                newErrors.age = value.trim() ? (validateAge(value) ? "" : "Age must be a positive non-zero integer") : "Age is required";
                break;
            case "phoneNumber":
                newErrors.phoneNumber = value.trim() ? (validatePhoneNumber(value) ? "" : "Phone number must contain 10 digits") : "Phone number is required";
                break;
            case "startDate":
                newErrors.startDate = value.trim() ? (validateStartDate(value) ? "" : "Start date must be today or within the last two weeks") : "Start date is required";
                break;
            case "jobRole":
                newErrors.jobRole = value.trim() ? "" : "Job Role is required";
                break;
            case "address":
                newErrors.address = value.trim() ? "" : "Address is required";
                break;
            default:
                break;
        }
    
        setErrors(newErrors);
    };
 

    const handleSubmit = async (e) => {
        e.preventDefault();   
        if (!name || !empNumber || !email || !age || !phoneNumber || !startDate || !jobRole || !address) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if there are any validation errors
        if (Object.values(errors).some(error => error !== "")) {
            alert("Please correct validation errors before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3500/EmpReg/createUser", { name, empNumber, email, age, startDate, jobRole, phoneNumber, address });
            console.log(response);
            navigate("/users");
        } catch (err) {
            if (err.response && err.response.data.error === 'Duplicate empNumber. Please choose a unique empNumber.') {
                alert('Duplicate empNumber. Please choose a unique empNumber.');
            } else {
                console.error(err);
                alert('An error occurred while creating the user.');
            }
        }
    };

    return (
        <div>
            <div className="users-container">
                <div className="users-content">
                    <form onSubmit={handleSubmit}>
                        <h2>Add Employee</h2>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                                value={name}
                                onBlur={handleBlur}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <p className="error-message">{errors.name}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="id">Emp No</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="Enter ID"
                                value={empNumber}
                                onBlur={handleBlur}
                                onChange={(e) => setEmpNumber(e.target.value)}
                            />
                            {errors.id && (
                                <p className="error-message">{errors.id}</p>
                            )}
                            {errors.duplicateEmpNumber && (
                                <p className="error-message">{errors.duplicateEmpNumber}</p>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onBlur={handleBlur}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                placeholder="Enter Age"
                                value={age}
                                onBlur={handleBlur}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            {errors.age && (
                                <p className="error-message">{errors.age}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onBlur={handleBlur}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors.phoneNumber && (
                                <p className="error-message">{errors.phoneNumber}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                onBlur={handleBlur}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            {errors.startDate && (
                                <p className="error-message">{errors.startDate}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="jobRole">Job Role</label>
                            <select
                                id="jobRole"
                                name="jobRole"
                                value={jobRole}
                                onBlur={handleBlur}
                                onChange={(e) => setJobRole(e.target.value)}
                            >
                                <option value="">Select Job Role</option>
                                <option value="Head Cook">Head Cook</option>
                                <option value="Driver">Driver</option>
                                <option value="Dish Washer">Dish Washer</option>
                                <option value="Cook 2">Cook 2</option>
                                <option value="Helper">Helper</option>
                                <option value="Quality Check">Quality Check</option>
                            </select>
                            {errors.jobRole && (
                                <p className="error-message">{errors.jobRole}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Enter Address"
                                value={address}
                                onBlur={handleBlur}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && (
                                <p className="error-message">{errors.address}</p>
                            )}
                        </div>
                        <button type="submit" className="btn-submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;

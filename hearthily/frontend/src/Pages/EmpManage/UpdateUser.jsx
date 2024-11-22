import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/Employee CSS/updateUser.css'

function UpdateUsers() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [empNumber, setEmployeeId] = useState("");
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    // Validation states
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3500/EmpReg/getUser/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.name);
                setEmail(userData.email);
                setAge(userData.age);
                setEmployeeId(userData.empNumber);
                setAddress(userData.address);
                setStartDate(userData.startDate);
                setJobRole(userData.jobRole);
                setPhoneNumber(userData.phoneNumber);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validations before submitting
        if (validateForm()) {
            try {
                await axios.put(`http://localhost:3500/EmpReg/updateUser/${id}`, { 
                    name, 
                    email, 
                    age, 
                    empNumber,
                    address,
                    startDate,
                    jobRole,
                    phoneNumber
                });
                navigate('/users'); // Navigate to user list 
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    // Validation function
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Name validation
        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        // Email validation
        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        // Age validation
        if (!age.trim()) {
            errors.age = "Age is required";
            isValid = false;
        } else if (isNaN(age)) {
            errors.age = "Age must be a number";
            isValid = false;
        }

        // Employee ID validation
        if (!empNumber.trim()) {
            errors.empNumber = "Employee ID is required";
            isValid = false;
        }

        // Address validation
        if (!address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        }

        // Start Date validation
        if (!startDate.trim()) {
            errors.startDate = "Start Date is required";
            isValid = false;
        } else {
            // Perform date validation here (today or 2 weeks before today)
            // Example: compare startDate with today or two weeks before
        }

        // Job Role validation
        if (!jobRole.trim()) {
            errors.jobRole = "Job Role is required";
            isValid = false;
        }

        // Phone Number validation
        if (!phoneNumber.trim()) {
            errors.phoneNumber = "Phone Number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone Number must be 10 digits";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleBlur = (e) => {
        validateForm();
    };

    return (
        <div className='Emp container'> 
            <div className='Emp form-container'> 
                <form onSubmit={handleSubmit}>
                    <h2>Update Employee Details</h2>
                    <div className='Emp form-group'>
    <label htmlFor="">Name</label>
    <input type="text" placeholder='Enter Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur} />
    {errors.name && <div className="error">{errors.name}</div>}
</div>
        <div className='Emp form-group'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} />
            {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className='Emp form-group'>
            <label htmlFor="">Age</label>
            <input type="text" placeholder='Enter Age' className='form-control' value={age} onChange={(e) => setAge(e.target.value)} onBlur={handleBlur} />
            {errors.age && <div className="error">{errors.age}</div>}
        </div>
        <div className='Emp form-group'>
            <label htmlFor="">Employee ID</label>
            <input type="text" placeholder='Enter Employee ID' className='form-control' value={empNumber} onChange={(e) => setEmployeeId(e.target.value)} onBlur={handleBlur} />
            {errors.empNumber && <div className="error">{errors.empNumber}</div>}
        </div>
            <div className='Emp form-group'>
                <label htmlFor="">Address</label>
                <input type="text" placeholder='Enter Address' className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} onBlur={handleBlur} />
                {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div className='Emp form-group'>
                <label htmlFor="">Start Date</label>
                <input type="text" placeholder='Enter Start Date' className='form-control' value={startDate} onChange={(e) => setStartDate(e.target.value)} onBlur={handleBlur} />
                {errors.startDate && <div className="error">{errors.startDate}</div>}
            </div>
            <div className='Emp form-group'>
                <label htmlFor="">Job Role</label>
                <input type="text" placeholder='Enter Job Role' className='form-control' value={jobRole} onChange={(e) => setJobRole(e.target.value)} onBlur={handleBlur} />
                {errors.jobRole && <div className="error">{errors.jobRole}</div>}
            </div>
            <div className='Emp form-group'>
                <label htmlFor="">Phone Number</label>
                <input type="text" placeholder='Enter Phone Number' className='form-control' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onBlur={handleBlur} />
                {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            </div>

                    <button type="submit" className='btn-update'>Update</button> 
                </form>
            </div>
        </div>
    );
}

export default UpdateUsers;

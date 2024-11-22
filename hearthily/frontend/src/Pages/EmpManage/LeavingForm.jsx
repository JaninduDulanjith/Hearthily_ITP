import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function LeavingForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [empNumber, setEmployeeId] = useState("");
    const [leavingDate, setLeavingDate] = useState("");
    const [reasonForLeaving, setReasonForLeaving] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3500/EmpReg/getUser/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.name);
                setEmployeeId(userData.empNumber);
            })
            .catch(err => console.log(err));
    }, [id]);

    const validateLeavingDate = (date) => {
        const today = new Date();
        const leavingDateValue = new Date(date);
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);
        return leavingDateValue >= today && leavingDateValue <= twoWeeksLater;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().slice(0, 10);
        const isValidDate = validateLeavingDate(leavingDate);

        if (!isValidDate) {
            setErrors({ leavingDate: "Leaving date should be today or within the next two weeks." });
            return;
        }

        try {
            await axios.post(`http://localhost:3500/leave/apply`, { 
                empNumber, 
                name,
                date: leavingDate,
                reason: reasonForLeaving
            });            
            navigate('/users');  
        } catch (error) {
            console.error('Error updating leave application:', error);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Leave Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            readOnly 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="empNumber">ID Number:</label>
                        <input
                            type="text"
                            id="empNumber"
                            className="form-control"
                            value={empNumber}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leavingDate">Leaving Date:</label>
                        <input
                            type="date"
                            id="leavingDate"
                            className="form-control"
                            value={leavingDate}
                            min={(new Date().toISOString().slice(0, 10))}
                            max={(new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10)}
                            onChange={(e) => setLeavingDate(e.target.value)}
                        />
                        {errors.leavingDate && (
                            <p className="error-message">{errors.leavingDate}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="reasonForLeaving">Reason for Leaving:</label>
                        <textarea
                            id="reasonForLeaving"
                            className="form-control"
                            value={reasonForLeaving}
                            onChange={(e) => setReasonForLeaving(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LeavingForm;

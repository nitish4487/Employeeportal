import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import Alert from './Alert';

export default function Leaveform() {
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [reason, setReason] = useState('')
    const [managerUserName, setManagerUserName] = useState('')
    const [managerId, setManagerId] = useState('')
    const [applicantId, setApplicantId] = useState('')
    const [applicantName, setApplicantName] = useState('')
    const leaveStatus = 'pending'

    const [isValid, setIsValid] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)

    const [managerList, setManagerList] = useState([])

    useEffect(() => {
        getAllManagers()
        if (managerUserName) getUserByUserName(managerUserName)
        setApplicantId(localStorage.getItem('loggedInId'))
        setApplicantName(localStorage.getItem('loggedInFullName'))
    }, [managerUserName])

    const getAllManagers = () => {
        EmployeeService.getAllManagers().then((response) => {
            setManagerList(response.data)
        }).catch(error => console.log(error))
    }

    const getUserByUserName = (managerUserName) => {
        EmployeeService.getUserByUserName(managerUserName).then(response => {
            setManagerId(response.data.id)
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const leaveObj = { applicantId, applicantName, managerId, fromDate, toDate, reason, leaveStatus }

        if (!managerId || !fromDate || !toDate || !reason.trim()) {
            setIsValid(false)
        } else {
            EmployeeService.createLeave(leaveObj).then(() => {
                setIsSuccess(true)

                setApplicantName('')
                setApplicantId('')
                setManagerId('')
                setManagerUserName('')
                setReason('')
                setToDate('')
                setFromDate('')
                navigate("/EmployeePage")
            })
        }
    }

    return (
        <div className="bg-container d-flex justify-content-center align-items-center min-vh-100">
          
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: '500px', background: "rgba(255,255,255,0.9)" }}>
                <h2 className="text-center text-primary fw-bold mb-4">Apply for Leave</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Choose your Manager</label>
                        <select
                            className="form-select rounded-pill"
                            onChange={(e) => setManagerUserName(e.target.value)}
                            value={managerUserName}
                        >
                            <option value="">Select</option>
                            {managerList.map(manager => (
                                <option value={manager.userName} key={manager.id}>
                                    {manager.adminName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">From Date</label>
                        <input
                            type="date"
                            className="form-control rounded-pill"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">To Date</label>
                        <input
                            type="date"
                            className="form-control rounded-pill"
                            min={fromDate}
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Reason</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Enter reason for leave"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    <div className="d-grid mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-pill fw-semibold py-2 shadow-sm"
                        >
                            Submit
                        </button>
                    </div>

                    <div className="mt-3">
                        {!isValid && <Alert text="Enter Valid Data" color="red" />}
                        {isSuccess && <Alert text="Leave Applied Successfully" color="green" />}
                    </div>
                </form>
            </div>
        </div>
    )
}

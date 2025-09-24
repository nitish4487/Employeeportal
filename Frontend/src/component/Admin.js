import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import Statuscomponent from './Statuscomponent'
import Navbar from './Navbar'

export default function Admin() {
    const [leaves, setLeaves] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const managerId = localStorage.getItem('loggedInid')
        getLeavesByManagerId(managerId)
    }, [])

    const getLeavesByManagerId = (managerId) => {
        EmployeeService.getLeavesByManagerId(managerId).then((response) => {
            setLeaves(response.data)
        }).catch(error => console.log(error))
    }

    const acceptOrRejectLeave = (e, leaveId, acceptOrReject) => {
        e.preventDefault()
        EmployeeService.getLeaveByLeaveId(leaveId).then((response) => {
            const applicantId = response.data.applicantId
            const applicantName = response.data.applicantName
            const managerId = response.data.managerId
            const fromDate = response.data.fromDate
            const toDate = response.data.toDate
            const reason = response.data.reason
            const leaveStatus = acceptOrReject

            const leave = { applicantId, applicantName, managerId, fromDate, toDate, reason, leaveStatus }

            EmployeeService.updateLeave(response.data.id, leave).then(() => {
                getLeavesByManagerId(managerId) // refresh data after action
            }).catch(error => console.log(error))
        })
    }

    const handleLogout = () => {
        navigate("/Msign")
        localStorage.clear()
    };

    return (
        <>
            <Navbar />

            <div className="bg-container d-flex justify-content-center align-items-start min-vh-100 pt-5">
                <div className="card shadow-lg border-0 rounded-4 p-4 w-100" style={{ maxWidth: "1100px", background: "rgba(255,255,255,0.9)" }}>
                    <h2 className="text-center text-primary fw-bold mb-4">Manage Leaves</h2>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-primary text-center">
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Applicant Name</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave, index) => (
                                    <tr key={leave.id} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{leave.applicantName}</td>
                                        <td>{leave.fromDate}</td>
                                        <td>{leave.toDate}</td>
                                        <td>{leave.reason}</td>
                                        <td><Statuscomponent status={leave.leaveStatus} /></td>
                                        <td>
                                            {leave.leaveStatus === 'pending' ? (
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm rounded-pill"
                                                        onClick={(e) => acceptOrRejectLeave(e, leave.id, 'accepted')}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm rounded-pill"
                                                        onClick={(e) => acceptOrRejectLeave(e, leave.id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-info btn-sm rounded-pill" disabled>Accept</button>
                                                    <button className="btn btn-info btn-sm rounded-pill" disabled>Reject</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-4">
                        <button className="btn btn-primary rounded-pill px-4" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Statuscomponent from './Statuscomponent'

export default function EmployeePL() {
    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        const applicantId = localStorage.getItem('loggedInId')
        getLeavesByApplicantId(applicantId)
    }, [leaves])

    const getLeavesByApplicantId = (applicantId) => {
        EmployeeService.getLeavesByApplicantId(applicantId).then((response) => {
            setLeaves(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteLeave = (leaveId) => {
        EmployeeService.deleteLeave(leaveId).then((response) => {
            // refresh after delete
        }).catch(error => console.log(error))
    }

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="card shadow-lg rounded-4 border-0">
                    <div className="card-body p-4">
                        <h2 className="text-center text-primary fw-bold">
                            Your Leave Applications
                        </h2>
                        <p className="text-center text-muted mb-4">
                            Track your leave history and current status
                        </p>

                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center">Sl No.</th>
                                        <th className="text-center">From Date</th>
                                        <th className="text-center">To Date</th>
                                        <th className="text-center">Reason</th>
                                        <th className="text-center">Leave Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaves.map((leave, index) => (
                                            <tr key={leave.id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{leave.fromDate}</td>
                                                <td className="text-center">{leave.toDate}</td>
                                                <td className="text-center">{leave.reason}</td>
                                                <td className="text-center">
                                                    <Statuscomponent status={leave.leaveStatus} />
                                                </td>
                                                <td className="text-center">
                                                    {
                                                        leave.leaveStatus === 'pending' ? (
                                                            <button
                                                                className="btn btn-sm btn-outline-danger rounded-pill"
                                                                onClick={() => deleteLeave(leave.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary rounded-pill"
                                                                disabled
                                                            >
                                                                Delete
                                                            </button>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-4">
                            <a
                                href="/Applyleave"
                                className="btn btn-primary px-4 rounded-pill shadow-sm"
                                role="button"
                            >
                                Apply for Leave
                            </a>
                        </div>

                        <div className="text-center mt-3">
                            <Link to="/EmployeeDashboard" className="text-decoration-none text-primary fw-semibold">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


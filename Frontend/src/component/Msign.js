import React, { useRef, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import image from "../public/103.svg";
import EmployeeService from '../services/EmployeeService';

export default function Msign() {
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const userRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeService.getAdminByAdminName(adminName).then((response) => {
            if (response.data.adminName === adminName && response.data.password === password) {
                localStorage.setItem('loggedInid', response.data.id);
                navigate('/AdminPage');
            } else {
                alert("Wrong Credentials, Please try again");
            }
        }).catch(() => {
            alert("Error logging in. Please try again.");
        });
    };

    return (
        <>
            <Navbar />

            <div className="bg-container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: "950px", width: "100%" }}>
                    <div className="row g-0">
                        {/* Left side image */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
                            <img
                                src={image}
                                alt="signup"
                                style={{ width: "80%", maxWidth: "400px" }}
                            />
                        </div>

                        {/* Right side form */}
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="p-5 w-100">
                                <h2 className="text-center text-info fw-bold mb-4">Admin Log In</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Admin Username</label>
                                        <input
                                            className="form-control rounded"
                                            type="text"
                                            autoComplete="off"
                                            name="adminName"
                                            ref={userRef}
                                            onChange={(e) => setAdminName(e.target.value)}
                                            value={adminName}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            className="form-control rounded"
                                            type="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid mb-3">
                                        <button className="btn btn-primary rounded-pill" type="submit">
                                            Login
                                        </button>
                                    </div>
                                    <p className="text-center mt-3">
                                        <Link to="/Msignup" className="text-decoration-none">
                                            Register as Admin
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

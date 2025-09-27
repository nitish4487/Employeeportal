import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EmployeeService from '../services/EmployeeService';
import Alert from './Alert';
import image from "../images/sign.svg";

export default function Esign({ setIsLogged }) {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [credOk, setCredOk] = useState(true);

  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    EmployeeService.getEmployeeByUserName(user)
      .then((response) => {
        if (response.data.userName === user && response.data.password === pwd) {
          setCredOk(true);

          localStorage.setItem('loggedInFullName', response.data.fullName);
          localStorage.setItem('loggedInUserName', response.data.userName);
          localStorage.setItem('loggedInId', response.data.id);

          navigate("/EmployeeDashboard");
        } else {
          setCredOk(false);
        }
      })
      .catch(() => {
        setCredOk(false);
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
                alt="employee-login"
                style={{ width: "80%", maxWidth: "400px" }}
              />
            </div>

            {/* Right side form */}
            <div className="col-md-6 d-flex align-items-center">
              <div className="p-5 w-100">
                <h2 className="text-center text-info fw-bold mb-4">Employee Log In</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      className="form-control rounded"
                      type="text"
                      autoComplete="off"
                      name="userName"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control rounded"
                      type="password"
                      name="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                    />
                  </div>

                  {!credOk && (
                    <div className="mb-3">
                      <Alert text="Wrong Credentials, Please try again" color="red" />
                    </div>
                  )}

                  <div className="d-grid mb-3">
                    <button className="btn btn-primary rounded-pill" type="submit">
                      Login
                    </button>
                  </div>

                  <p className="text-center">
                    <a href="/Esignup" className="btn btn-outline-primary rounded-pill">
                      Signup
                    </a>
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

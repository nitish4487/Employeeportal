import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { User, Mail, Home, Briefcase, LogOut } from "lucide-react";

export default function Employee() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const applicant = localStorage.getItem("loggedInUserName");
    getData(applicant);
  }, []);

  const getData = (applicant) => {
    EmployeeService.getEmployeeByUserName(applicant)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    navigate("/Esign");
    localStorage.clear();
  };

  return (
    <>
      <Navbar />

      <div
        className="container my-5 p-4"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="row g-4">
          {/* Left Profile Container */}
          <div
            className="col-md-4 d-flex flex-column align-items-center justify-content-center rounded-4 shadow-lg p-4"
            style={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              color: "#fff",
              minHeight: "400px",
            }}
          >
            <img
              src={require("../images/27.png")}
              alt="Employee"
              className="rounded-circle shadow"
              style={{
                height: "220px",
                width: "220px",
                objectFit: "cover",
              }}
            />
            <h2 className="fw-bold mt-3">{user.fullName}</h2>
            <p className="opacity-75">{user.userName}</p>
          </div>

          {/* Right Info Container */}
          <div className="col-md-8">
            <div
              className="bg-white rounded-4 shadow-lg p-5"
              style={{ minHeight: "400px" }}
            >
              <h3 className="text-primary fw-bold mb-4">Employee Details</h3>

              <div className="row g-3">
                
                <div className="col-md-6">
                  <div className="p-3 rounded shadow-sm bg-light hover-card">
                    <User className="text-primary mb-1" />
                    <h6 className="fw-bold">Name</h6>
                    <p>{user.fullName}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded shadow-sm bg-light hover-card">
                    <Briefcase className="text-warning mb-1" />
                    <h6 className="fw-bold">Username</h6>
                    <p>{user.userName}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded shadow-sm bg-light hover-card">
                    <Mail className="text-success mb-1" />
                    <h6 className="fw-bold">Email</h6>
                    <p>{user.emailId}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded shadow-sm bg-light hover-card">
                    <Home className="text-danger mb-1" />
                    <h6 className="fw-bold">Address</h6>
                    <p>{user.address}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-3 mt-5">
                <Link
                  to="/EmployeePage"
                  className="btn fw-bold rounded-pill px-4"
                  style={{
                    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Leave Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn fw-bold rounded-pill px-4 d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .hover-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </>
  );
}

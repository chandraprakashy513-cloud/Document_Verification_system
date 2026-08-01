import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="text-center mb-4">

          <div className="logo-circle">
            <i className="bi bi-person-plus-fill"></i>
          </div>

          <h2>Create Account</h2>

          <p>
            Secure Document Verification System
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn register-btn w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                ></span>
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <div className="text-center mt-4 text-white">

          Already have an account?

          <Link to="/" className="login-link">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // const res = await axios.post("", {

      // })

      // Save Token & User
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/upload");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="text-center mb-4">

          <div className="login-logo">
            <i className="bi bi-shield-lock-fill"></i>
          </div>

          <h2>Document Verification</h2>

          <p>Secure Login Portal</p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group mb-3">

            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="btn login-btn w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <div className="text-center mt-4 text-white">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
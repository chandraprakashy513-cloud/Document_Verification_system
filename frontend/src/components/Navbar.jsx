import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/upload">
          Document Verification
        </Link>

        <div className="collapse navbar-collapse">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mydocuments">
                My Documents
              </Link>
            </li>

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}

            <li className="nav-item">
              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
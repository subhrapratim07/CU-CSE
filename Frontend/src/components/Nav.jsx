import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setIsLoggedIn(!!userEmail);
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      toast.info(location.state.toast);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    toast.success("Logged out successfully!");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid px-3">
        {/* Brand + Toggler */}
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo and Title */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ minWidth: 0 }}>
            <img src="/logo.png" alt="Logo" height="40" style={{ maxHeight: '40px' }} />
            <div className="d-flex flex-column lh-sm">
              <span className="fw-bold fs-6 text-truncate">University of Calcutta</span>
              <span className="text-white-50 fs-6 text-truncate">Computer Science & Engineering</span>
            </div>
          </Link>

          {/* Toggler aligned right & smaller */}
          <button
            className="navbar-toggler ms-auto p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ fontSize: '0.9rem', padding: '4px 8px' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-3"><Link className="nav-link fs-5" to="/">Home</Link></li>
            <li className="nav-item me-3"><Link className="nav-link fs-5" to="/About">About</Link></li>
            <li className="nav-item"><Link className="nav-link fs-5 " to="/Contact">Contact</Link></li>
          </ul>
          <div className="d-flex gap-2">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn btn-outline-light">Register</Link>
                <Link to="/login" className="btn btn-outline-light">Login</Link>
              </>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

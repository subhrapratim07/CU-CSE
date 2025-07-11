import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if current path starts with link path (ignore trailing slashes)
  const isActive = (path) => {
    if (!path || path === "#") return false;
    const currentPath = location.pathname.replace(/\/+$/, ''); // remove trailing slashes
    const targetPath = path.replace(/\/+$/, '');
    return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="d-md-none d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2">
        <h5 className="m-0">Dashboard</h5>
        <button className="btn btn-sm btn-light" onClick={() => setSidebarOpen(!sidebarOpen)}>☰ Menu</button>
      </div>

      {/* Sidebar */}
      <div className="d-flex flex-column flex-md-row">
        <div
          className={`bg-light border-end p-3 ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`}
          style={{ minWidth: '250px' }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/Dashboard"
                className={`nav-link ${isActive("/Dashboard") ? "active bg-primary text-white" : ""}`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
              >
                My Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/UpdatePersonalInfo"
                className={`nav-link ${isActive("/UpdatePersonalInfo") ? "active bg-primary text-white" : ""}`}
              >
                Update Personal Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/UpdateFile"
                className={`nav-link ${isActive("/UpdateFile") ? "active bg-primary text-white" : ""}`}
              >
                Update File
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
              >
                Change Password
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
              >
                My Receipts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

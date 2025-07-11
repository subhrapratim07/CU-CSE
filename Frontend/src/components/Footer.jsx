import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { PiQrCodeFill } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Department Intro */}
          <div className="col-md-4 text-center text-md-start">
            <h4 className="fw-bold">University of Calcutta</h4>
            <p className="small mb-1 fw-bold">Department of Computer Science & Engineering</p>
            <p className="small">
              Fostering excellence in computing, research, and innovation. Explore our programs, projects, and collaborations.
            </p>
            <p className="small fw-bold mb-1">Connect with us</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start fs-5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaLinkedin /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaGithub /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center text-md-start">
            <div className="row">
              <div className="col-6">
                <h6 className="fw-bold">Quick Links</h6>
                <ul className="list-unstyled small">
                  <li><Link to="/about" className="text-light text-decoration-none">About Dept.</Link></li>
                  <li><Link to="/programs" className="text-light text-decoration-none">Programs</Link></li>
                  <li><Link to="/faculty" className="text-light text-decoration-none">Faculty</Link></li>
                  <li><Link to="/research" className="text-light text-decoration-none">Research</Link></li>
                  <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
                </ul>
              </div>
              <div className="col-6">
                <h6 className="fw-bold">Student Portal</h6>
                <ul className="list-unstyled small">
                  <li><Link to="/login" className="text-light text-decoration-none">Login</Link></li>
                  <li><Link to="/dashboard" className="text-light text-decoration-none">Dashboard</Link></li>
                  <li><Link to="/notices" className="text-light text-decoration-none">Notices</Link></li>
                  <li><Link to="/submit-project" className="text-light text-decoration-none">Submit Project</Link></li>
                  <li><Link to="/admin" className="text-light text-decoration-none">Admin Panel</Link></li>
                </ul>
              </div>
            </div>

            {/* Optional Images */}
            <div className="mt-4 d-flex gap-4 flex-wrap justify-content-center justify-content-md-start">
              <img src="/logo.png" alt="CU Logo" height="100" />
              <img src="/qr.png" alt="QR Code" height="100" />
            </div>
          </div>

          {/* Address and Map */}
          <div className="col-md-4 text-center text-md-start">
            <h6 className="fw-bold">Campus Location</h6>
            <p className="small mb-1">Acharya Prafulla Chandra Roy Shiksha Prangan, Kolkata – 700016</p>
            <p className="small mb-1">📞 +91 7407764192</p>
            <p className="small mb-1">✉️ csedept@caluniv.ac.in</p>
            <p className="small mb-3">🕒 Office Hours: Mon–Fri, 10 AM – 5 PM</p>

            <div className="ratio ratio-4x3 rounded overflow-hidden border border-light" style={{ height: '180px' }}>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29254.325219761766!2d88.39060350810196!3d22.570799404783468!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275cc7c13fb17%3A0x6e7fa4854f0740ae!2sAcharya%20Prafulla%20Chandra%20Roy%20Shiksha%20Prangan!5e1!3m2!1sen!2sin!4v1750872927193!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />

        {/* Bottom note */}
        <div className="text-center mt-3 small">
          © {new Date().getFullYear()} <strong>University of Calcutta</strong> – Dept. of Computer Science & Engineering. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

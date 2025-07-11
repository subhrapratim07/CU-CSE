import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Nav from './Nav';

const Home = () => {
  return (
    <>
      <Nav />
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Hero Section */}
      <div style={{
        backgroundImage: "url('/campusbg.jpg')", // ✅ Replace with an academic/campus-themed background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Gradient overlay at the bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000)',
          zIndex: 2,
        }} />

        {/* Hero Content */}
        <div className="container d-flex align-items-center" style={{
          minHeight: 'calc(100vh - 80px)',
          paddingTop: '60px',
          position: 'relative',
          zIndex: 3
        }}>
          <div className="row w-100">
            <div className="col-12 col-md-8 col-lg-6 px-4 py-5 text-black">
              <h1 className="display-5 fw-bold text-dark bg-body-secondary border ">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</h1>
              <h2 className="mt-2 text-dark fw-semibold bg-body-secondary border">University of Calcutta</h2>

              
              
              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link to="/Dashboard" className="btn btn-warning px-4 py-2 fw-bold">
                  Student Dashboard
                </Link>
                <Link to="https://www.caluniv.ac.in/academic/Compsc.html" className="btn btn-dark px-4 py-2 fw-semibold">
                  About the Department
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

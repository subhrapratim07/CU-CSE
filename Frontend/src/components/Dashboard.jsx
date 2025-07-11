import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Nav from './Nav';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classroll: '',
    dob: '',
    address: ''
  });

  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const semesterInfo = {
    semester: "M.Sc 2nd Semester",
    subjects: [
      "Advanced Algorithms",
      "Machine Learning",
      "Network Security",
      "Compiler Design",
      "Distributed Systems"
    ]
  };

  useEffect(() => {
    if (location.state?.toast) {
      toast.warning(location.state.toast);
    }
  }, [location.state]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/home', { state: { toast: "Please login to access dashboard." } });
      return;
    }

    // Fetch basic user info
    axios.get(`http://localhost:40001/user-info/${userEmail}`)
      .then(res => {
        setFormData(prev => ({ ...prev, ...res.data }));
      })
      .catch(() => {
        localStorage.removeItem('userEmail');
        navigate('/home', { state: { toast: "Session expired. Please login again." } });
      });

    // Fetch additional personal details
    axios.get(`http://localhost:40001/personal-details/${userEmail}`)
      .then(res => {
        const { dob, classroll, houseNo, streetName, village, postOffice, pinCode, district, state } = res.data;
        const address = `${houseNo}, ${streetName}, ${village}, ${postOffice}, ${district}, ${state} - ${pinCode}`;
        setFormData(prev => ({
          ...prev,
          classroll, // hardcoded for now, change if needed
          dob,
          address
        }));
      });

    // Fetch photo and signature
    axios.get(`http://localhost:40001/upload-files/${userEmail}`)
      .then(res => {
        setPhoto(res.data.photo);
        setSignature(res.data.signature);
      });
  }, [navigate]);

  return (
    <>
      <Nav />
      
      

      <div className="d-flex flex-column flex-md-row">
       <Sidebar/>

        {/* Main Content */}
        <div className="p-4 flex-grow-1">
          <h3>Student Profile</h3>
          <div className="row mt-4">
            {/* Student Image */}
            <div className="col-12 col-sm-4 d-flex justify-content-center justify-content-sm-start">
  <div className="text-center text-sm-start">
    {photo && (
      <div className="mb-3">
        <img src={photo} alt="Student" className="img-thumbnail" width="150" />
        
      </div>
    )}
    {signature && (
      <div>
        <img src={signature} alt="Signature" className="img-thumbnail" width="150" />
        
      </div>
    )}
  </div>
</div>


            {/* Student Info */}
            <div className="col-12 col-sm-8">
              <div className="bg-light p-3 rounded">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Class Roll No:</strong> {formData.classroll}</p>
                <p><strong>Phone No:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Date of Birth:</strong> {formData.dob}</p>
                <p><strong>Address:</strong> {formData.address}</p>
              </div>
            </div>

            {/* Semester Info */}
            <div className="mt-4 p-3 border rounded bg-light">
              <h5 className="fw-bold mb-2">Semester Info</h5>
              <p className="m-0"><strong>Current Semester:</strong> {semesterInfo.semester}</p>
              <div className="mt-2">
                <strong>Subjects:</strong>
                <ul className="mb-0">
                  {semesterInfo.subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Dashboard;

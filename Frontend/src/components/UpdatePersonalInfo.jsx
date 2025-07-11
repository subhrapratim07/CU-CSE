import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import Footer from './Footer';
import Sidebar from './Sidebar';

const UpdatePersonalInfo = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    fatherName: '',
    motherName: '',
    fatherProfession: '',
    guardianName: '',
    guardianRelation: '',
    religion: '',
    dob: '',
    classroll: '',
    sex: '',
    caste: '',
    minorityCommunity: '',
    differentlyAbled: '',
    disabilityPercent: '',
    domicileWB: '',
    aadhaar: '',
    houseNo: '',
    streetName: '',
    village: '',
    postOffice: '',
    pinCode: '',
    district: '',
    state: ''
  });

  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:40001/user-info/${userEmail}`)
        .then(res => setFormData(prev => ({
          ...prev,
          email: res.data.email,
          name: res.data.name,
          phone: res.data.phone
        })))
        .catch(() => toast.error("Unable to fetch user data"));
    } else {
      toast.warn("Please login first.");
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:40001/save-personal-details', formData);
      toast.success("Personal details saved successfully");
    } catch (err) {
      toast.error("Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <div className="d-flex flex-column flex-md-row">
        <Sidebar />

        <div className="container my-4 flex-grow-1">
          <h3 className="mb-4">Update Personal Info</h3>
          <form onSubmit={handleSubmit}>
            {/* Read-only Fields */}
            <div className="mb-3">
              <label>Email</label>
              <input className="form-control" value={formData.email} readOnly />
            </div>
            <div className="mb-3">
              <label>Full Name</label>
              <input className="form-control" value={formData.name} readOnly />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input className="form-control" value={formData.phone} readOnly />
            </div>

            {/* Editable Fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Name of Father</label>
                <input name="fatherName" className="form-control" value={formData.fatherName} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Name of Mother</label>
                <input name="motherName" className="form-control" value={formData.motherName} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Profession of Father</label>
                <input name="fatherProfession" className="form-control" value={formData.fatherProfession} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Name of Guardian</label>
                <input name="guardianName" className="form-control" value={formData.guardianName} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Relation with Guardian</label>
                <input name="guardianRelation" className="form-control" value={formData.guardianRelation} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Religion</label>
                <input name="religion" className="form-control" value={formData.religion} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <input name="dob" type="date" className="form-control" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Sex</label>
                <select name="sex" className="form-control" value={formData.sex} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                  <option>OTHER</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Caste</label>
                <input name="caste" className="form-control" value={formData.caste} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Minority Community</label>
                <select name="minorityCommunity" className="form-control" value={formData.minorityCommunity} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Differently Abled</label>
                <select name="differentlyAbled" className="form-control" value={formData.differentlyAbled} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Disability (%)</label>
                <input name="disabilityPercent" type="number" className="form-control" value={formData.disabilityPercent} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Domicile in West Bengal</label>
                <select name="domicileWB" className="form-control" value={formData.domicileWB} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Aadhaar No</label>
                <input name="aadhaar" className="form-control" value={formData.aadhaar} onChange={handleChange} required pattern="\d{12}" title="Enter 12-digit Aadhaar number" />
              </div>
              <div className="col-md-6 mb-3">
                <label>Class Roll No</label>
                <input name="classroll" className="form-control" value={formData.classroll} onChange={handleChange} required />
              </div>

              <h5 className="mt-4">Present Address</h5>
              <div className="col-md-4 mb-3">
                <label>House No</label>
                <input name="houseNo" className="form-control" value={formData.houseNo} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label>Street Name</label>
                <input name="streetName" className="form-control" value={formData.streetName} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label>Village/Town</label>
                <input name="village" className="form-control" value={formData.village} onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label>Post Office</label>
                <input name="postOffice" className="form-control" value={formData.postOffice} onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label>PIN Code</label>
                <input name="pinCode" className="form-control" value={formData.pinCode} onChange={handleChange} required pattern="\d{6}" title="Enter 6-digit PIN Code" />
              </div>
              <div className="col-md-4 mb-3">
                <label>District</label>
                <input name="district" className="form-control" value={formData.district} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>State</label>
                <input name="state" className="form-control" value={formData.state} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3" disabled={loading}>
              {loading ? "Saving..." : "Save Details"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default UpdatePersonalInfo;

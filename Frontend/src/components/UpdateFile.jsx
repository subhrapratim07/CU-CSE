import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./Nav";
import Footer from "./Footer";

const UpdateFiles = () => {
  const [photo, setPhoto] = useState("");
  const [signature, setSignature] = useState("");
  const [results, setResults] = useState([]);
  const userEmail = localStorage.getItem("userEmail") || "";

  const MIN_SIZE = 50 * 1024;
  const MAX_SIZE = 200 * 1024;

  const validateFileSize = (file) => {
    if (file.size < MIN_SIZE) {
      toast.error(`${file.name} is smaller than 50KB.`);
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast.error(`${file.name} exceeds 200KB.`);
      return false;
    }
    return true;
  };

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFileSize(file)) {
      convertToBase64(file, setPhoto);
    } else {
      e.target.value = null;
      setPhoto("");
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFileSize(file)) {
      convertToBase64(file, setSignature);
    } else {
      e.target.value = null;
      setSignature("");
    }
  };

  const handleResultChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateFileSize(file)) {
      e.target.value = null;
      return;
    }

    convertToBase64(file, (base64) => {
      setResults((prev) => {
        const newResults = [...prev];
        newResults[index] = base64;
        return newResults;
      });
    });
  };

  const addResultInput = () => {
    setResults((prev) => [...prev, ""]);
  };

  const removeResultInput = (index) => {
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo || !signature) {
      return toast.error("Please upload both photo and signature.");
    }
    const filteredResults = results.filter((r) => r);

    try {
      await axios.post("http://localhost:40001/upload-files", {
        email: userEmail,
        photo,
        signature,
        results: filteredResults,
      });
      toast.success("Files uploaded successfully");
    } catch (err) {
      toast.error("File upload failed");
    }
  };

  return (
    <>
      <Nav />
      <div className="container my-5" style={{ minHeight: "100vh" }}>
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <h3 className="text-center mb-4">Upload Files</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={userEmail}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Photo (50KB - 200KB)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handlePhotoChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Signature (50KB - 200KB)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleSignatureChange}
                required
              />
            </div>

            <h5 className="mt-4">Upload Result(s)</h5>
            <small className="text-muted mb-2 d-block">
              Allowed: Image/PDF (50KB - 200KB each)
            </small>

            {results.map((_, index) => (
              <div className="mb-3 d-flex align-items-center" key={index}>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleResultChange(index, e)}
                  required={!results[index]}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={() => removeResultInput(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-secondary mb-3"
              onClick={addResultInput}
            >
              Add Result
            </button>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default UpdateFiles;

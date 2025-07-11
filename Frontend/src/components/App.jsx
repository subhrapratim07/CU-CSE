import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import UpdatePersonalInfo from './UpdatePersonalInfo';
import Footer from './Footer';
import Nav from './Nav';
import Dashboard from './Dashboard';
import UpdateFile from './UpdateFile';
import Sidebar from './Sidebar';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

<Router>
  <App />  {/* or your component tree */}
</Router>



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Sidebar" element={<Sidebar />}/>
        <Route path="/UpdatePersonalInfo" element={<UpdatePersonalInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/UpdateFile" element={<UpdateFile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

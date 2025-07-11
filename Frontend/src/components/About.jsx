// About.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import Footer from './Footer';
const About = () => {
    
  return (
    <>
    <Nav />
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* About Content */}
   <div className="container py-5 text-center">
  <h1 className="mb-4 display-4 fw-semibold text-dark" style={{ fontFamily:"cursive"}}>
    History of the department :
  </h1>
  <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: '900px', lineHeight: '1.8' }}>
    Established in the year 1980, the Department of Computer Science and Engineering, 
    situated at Rajabazar Science College Campus, meant for post graduate studies is one of 
    the largest and well established departments of Calcutta University. Very soon after its establishment, 
     department began to provide the intellectual foundations of Indian Technologies. Since then, over time, 
      department has played a vital role in the development technological resources by establishing the 
      ability of Indian researchers to carry out advanced scientific and technological research in various fields. 
      Their contribution is immense. The Department of Computer Science and Engineering has played a very 
      significant role in science and technology education and research in our country. It has vivid reputation 
      in the fields of different Computer applications, Information Sciences and Technology Studies. The prizes 
      and valuable contribution of its students and faculties in all sphere of life have always enhanced the brilliance of the department.
  </p>
</div>
</div>

<Footer />

</>
  );
};

export default About;

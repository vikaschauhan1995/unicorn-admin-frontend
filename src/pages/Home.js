import React, { useState } from 'react';
import '../style/Home.scss';
import Sidebar from '../components/Sidebar';
// import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from '../components/Navbar';

const Home = () => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const toggleShow = () => setShow((s) => !s);
  return (
    <div className="Home__container">
      <Navbar />
      <div className="Home__root_container" style={{ backgroundColor: "red" }}>
        <div className="Home__sidebar">
          <Sidebar />
        </div>
        <div className="Home__body">Home Body</div>
      </div>
    </div>
  )
}

export default Home

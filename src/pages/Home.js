import React from 'react';
import '../style/Home.scss';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';

const Home = () => {
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

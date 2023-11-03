import logo from '../assets/logo-app2.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HeaderDashboard() {
  const history = useNavigate();
  let user = localStorage.getItem('user-info');

  function logOut() {
    localStorage.clear();
    history('/login');
  }
  return (
  <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#2BC0E4',height:'10%'}}>
  <div className="container-fluid">
  <Link to="/"><img src={logo} alt="Logo-App" style={{width:'15%'}}/></Link>
    <div className="" id="navbarSupportedContent" style={{width:'70%'}}>
      <ul className="navbar-nav navbar-collapse mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to='/list'><button className="btn">List Tourist</button></Link>
        </li>
        <li className="nav-item">
        <Link to="/profil"><button className="btn mx-2">Profil</button></Link>
        </li>
        <li className="nav-item">
        {user !== null ? (
        <button className="btn btn-dark mx-2" onClick={logOut}>Logout</button>
        ) : null}
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default HeaderDashboard;

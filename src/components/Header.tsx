import logo from '../assets/logo-app2.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-md" style={{backgroundColor:'#2BC0E4',height:'10%'}}>
  <div className="container-fluid">
      <Link to='/'><img src={logo} alt="Logo-App" style={{width:'15%'}}/></Link>
    <div className="" id="navbarSupportedContent">
      <ul className="navbar-nav navbar-collapse mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/home' className="btn cursor-pointer">
                Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className="btn cursor-pointer">
                Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register"><button className="btn mx-3" style={{backgroundColor: '#FFFFFF',padding:'8px'}}>Register</button></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Header;

import '../App.css';
import logo from '../assets/logo.png'
import BgHoliday from '../assets/holiday2.png'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const history = useNavigate();
  const [error, setError] = useState();
  const [notification, setNotification] = useState("");

  async function register() {
    console.warn(email, password, name);
    let item = { email, password, name};
    try {
      const response = await fetch("https://biroperjalanan.datacakra.com/api/authaccount/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });
  
      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          console.error("Registration error: ", result.error);
        } else {
          // const user = result.data;
          setNotification('Registration success, login!');
          history('/login');
        }
      } else {
        const errorData = await response.json();
        console.error("Registration error: ", errorData.error);
        setError(errorData.error);
        setTimeout(() => history('/'), 5000);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }
  }

  return (
    <div className="Register overflow-hidden" style={{height:'100vh',backgroundColor: "#EBEDC9"}}>
        <div className="container mt-5">
            <div className="row"> 
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-title mx-5 mt-5 d-inline-flex align-items-center">
                        <img src={logo} alt="logo" style={{width:'10vh'}} />
                        <h4 className="mt-2 mx-2">Join with Us ! <br></br>
                        <span className="-mt-5" style={{fontSize:'0.8rem',fontWeight:'100'}}>Make Your Trip Fun!</span></h4>
                        </div>
                        <div className="card-body">
                            <div className="mx-5 mb-3">
                                <label className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>Email</label>
                                <input type="email" name="email" className="form-control" id="email" placeholder="Input Email.." 
                                  onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="mx-5 mb-3">
                                <label className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Input Password.." 
                                        autoComplete="new-password" 
                                        onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <div className="mx-5 mb-3">
                                <label className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>Name</label>
                                <input type="name" name="name" className="form-control" id="name" placeholder="Input Name.." 
                                 onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className="mx-5 mb-5 text-center">
                                <button className="submit btn btn-warning form-control" onClick={register}>Register</button>
                                <span style={{fontSize:'0.75rem'}}>Do you have an account? <Link to="/login" className="">Login</Link></span>
                            </div>
                            <div className="mx-10 text-center">
                                <img src={logo} style={{width:'5vh'}} alt="" />
                                <span style={{fontSize:'0.75rem'}}>© 2023 PT. Biro Jasa Perjalanan DataCakra. All Rights Reserved</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="text-center p-2 radius-2">
                        <h3 className="Font-Custom" style={{color:'black'}}><span style={{color:'green'}}>Experience an unmatched travel adventure</span> with expert local guides, comfortable accommodation facilities, and a wide range of thrilling activities. <span style={{color:'green'}}>Traveling has never been easier !!</span></h3>
                    </div>
                    <div style={{float:'left'}}>
                        <img src={BgHoliday} alt="Holiday" className="" style={{width:'120vh'}} />
                    </div>
                    <h1>Register Now!</h1>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Register;

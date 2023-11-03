import '../App.css';
import logo from '../assets/logo.png'
import BgHoliday from '../assets/holiday.jpg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const history = useNavigate();
  const [error, setError] = useState();
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if(localStorage.getItem('user-info')){
      history('/profil');
    }
  },[])

  async function login() {
    console.warn(email, password);
    let item = { email, password };
    try {
      const response = await fetch("https://biroperjalanan.datacakra.com/api/authaccount/login", {
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
          console.error("Login error2: ", result.error);
          // Setel state notification untuk menampilkan pesan kesalahan ke pengguna
          setNotification(result.error);
        } else {
          const user = result.data;
          localStorage.setItem("user-info", JSON.stringify(result));
          localStorage.setItem("name", JSON.stringify(user.Name));
          localStorage.setItem("email", JSON.stringify(user.Email));
          localStorage.setItem("id", JSON.stringify(user.Id));
          localStorage.setItem("token", JSON.stringify(user.Token));
          history('/profil');
        }
      } else {
        const errorData = await response.json();
        console.error("Login error: ", errorData.error);
        setError(errorData.error);
        setNotification('Incorrect Email & Password, try again !');
        setTimeout(() => history('/'), 5000);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }
  }
  
  return(
    <div className="App">
        <div className="login-container">
            <div className="Login overflow-hidden" style={{height:'100vh',backgroundColor: "#2BC0E4"}}>
              <div className="container mt-5">
              <div className="row"> 
               <div className="col-lg-7">
                   <div className="text-center p-2 radius-2">
                       <h3 className="Font-Custom" style={{color:'white'}}><span style={{color:'yellow'}}>Experience an unmatched travel adventure</span> with expert local guides, comfortable accommodation facilities, and a wide range of thrilling activities. <span style={{color:'yellow'}}>Traveling has never been easier !!</span></h3>
                   </div>
                   <div style={{float:'left'}}>
                       <img src={BgHoliday} alt="Holiday" className="rounded-circle" style={{width:'120vh',marginLeft:'-220px'}} />
                   </div>
                   <h1 className="bg-white rounded-2 mt-5 mr-5 p-2 Font-Custom">Login Now!</h1>
               </div>
               <div className="col-lg-5">
                   <div className="card">
                       <div className="card-title mx-5 mt-5 d-inline-flex align-items-center">
                       <img src={logo} alt="logo" style={{width:'10vh'}} />
                       <h4 className="mt-2 mx-2">Log in to your account <br></br>
                       <span className="-mt-5" style={{fontSize:'0.8rem',fontWeight:'100'}}>Make Your Trip Fun!</span></h4>
                       </div>
                       <div className="card-body">
                       {/* <form className="form" onSubmit={onSubmit}> */}
                       {notification && <p className="error mx-5" style={{color:'red',fontSize:'13px'}}>{notification}</p>}
                             <div className="mx-5 mb-3">
                                <label className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>Email</label>
                            <input type="email" name="email" className="form-control" id="email" placeholder="Input Email.." 
                                 value={email}
                                 onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="mx-5 mb-3">
                                <label className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Input Password.." 
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}  />
                            </div>
                            <div className="mx-5 mb-5 text-center">
                                    <button className="submit btn btn-primary form-control" onClick={login}>Login
                                    </button>
                                <span style={{fontSize:'0.75rem'}}>Don't have an account yet? <Link to='/register' className="">Register here</Link></span>
                            </div>
                            <div className="mx-10 text-center">
                                <img src={logo} style={{width:'5vh'}} alt="" />
                                <span style={{fontSize:'0.75rem'}}>© 2023 PT. Biro Jasa Perjalanan DataCakra. All Rights Reserved</span>
                            </div>
                        {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
      </div>
  );}

export default Login;

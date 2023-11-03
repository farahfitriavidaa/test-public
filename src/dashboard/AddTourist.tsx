import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/HeaderDashboard';

function AddTourist() {
  const [tourist_email, setEmail] = useState('');
  const [tourist_location, setLocation] = useState('');
  const [tourist_name, setName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/login');
    }
  }, [navigate]);

  async function addTourist() {
    console.warn(tourist_email, tourist_location, tourist_name);
    const item = { tourist_email, tourist_location, tourist_name };
    try {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYWY1MTBlLTI3Y2EtNGQ0MS04NjM2LTA5MDcyZGEyM2U1MSIsImVtYWlsIjoiYmFkdUBnbWFpbC5jb20iLCJuYW1lIjoiU2kgQmFkdSIsImlhdCI6MTY5ODk4ODA5NSwiZXhwIjoxNjk5MDc0NDk1fQ.DOhTAsKfgd0duSFn99mxAkY_L0RG1TGgMWndZOewUr0';
      const response = await fetch("https://biroperjalanan.datacakra.com/api/Tourist", {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          console.error('Add tourist error: ', result.error);
        } else {
          const user = result.data;
          localStorage.setItem('user-info', JSON.stringify(result));
          navigate('/list');
        }
      } else {
        const errorData = await response.json();
        console.error('Add tourist error: ', errorData.error);
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Network error: ', error);
    }
  }

  return (
    <div className="AddTourist">
      <Header />
      <h1 className="Font-Custom mx-5 mt-5">Create Data Tourist</h1>
      <Link to='/list'>
        <button className="mx-5 btn"> 
        ← Back
        </button>
      </Link>
      <div className="card w-75 mx-5">
        <h5 className="card-header font-bold">Form Data Tourist</h5>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="tourist_email"
              className="form-control"
              placeholder="Tourist Email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="tourist_location"
              className="form-control"
              placeholder="Tourist Location.."
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="tourist_name"
              className="form-control"
              placeholder="Tourist Name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button className="mt-5 submit btn btn-primary form-control" onClick={addTourist}>
              Add Tourist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTourist;

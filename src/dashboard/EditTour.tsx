import { useState, useEffect } from 'react';
import Header from '../components/HeaderDashboard';
import { useParams,Link,useNavigate } from 'react-router-dom';

interface TouristData {
  id: string;
  createdat: string;
  tourist_email: string;
  tourist_name: string;
  tourist_location: string;
  tourist_profilepicture : string;
}

function EditTourist() {
  const { id } = useParams();
  const [data, setData] = useState<TouristData | null>(null);
  const [tourist_location, setLocation] = useState('');
  const [tourist_name, setName] = useState('');
  const [tourist_profilepicture, setProfile] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYWY1MTBlLTI3Y2EtNGQ0MS04NjM2LTA5MDcyZGEyM2U1MSIsImVtYWlsIjoiYmFkdUBnbWFpbC5jb20iLCJuYW1lIjoiU2kgQmFkdSIsImlhdCI6MTY5ODk4ODA5NSwiZXhwIjoxNjk5MDc0NDk1fQ.DOhTAsKfgd0duSFn99mxAkY_L0RG1TGgMWndZOewUr0'; 

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result); 
        } else {
          setError('Error fetching data by ID');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchData();
  }, [id]);

  const editTourist = async () => {
    try {
      interface RequestBody {
        tourist_location?: string;
        tourist_name?: string;
        tourist_profilepicture?: string;
      }
      
      const requestBody: RequestBody = {};
      
      if (tourist_location) {
        requestBody.tourist_location = tourist_location;
      }
      
      if (tourist_name) {
        requestBody.tourist_name = tourist_name;
      }
      
      if (tourist_profilepicture) {
        requestBody.tourist_profilepicture = tourist_profilepicture;
      }
      

    const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          setError('Edit tourist error: ' + result.error);
        } else {
          localStorage.setItem('user-info', JSON.stringify(result));
          navigate('/list');
        }
      } else {
        const errorData = await response.json();
        setError('Edit tourist error: ' + errorData.error);
      }
    } catch (error) {
      setError('Network error: ' + error);
    }
  };

  return (
    <div className="EditTourist">
      <Header />
      <h1 className="Font-Custom mx-5 mt-5">Edit Data Tourist</h1>
      <Link to='/list'>
        <button className="mx-5 btn"> 
        ← Back
        </button>
      </Link>
      <div className="card w-75 mx-5">
        <h5 className="card-header font-bold">Data Tourist</h5>
        <div className="card-body">
          <div className="form-group">
            <label>Profile Pictures</label>
            <div className="row">
              <div className="col-md-4">
                {data ? (
                  <img src={data.tourist_profilepicture} alt="image" className="w-75 rounded-circle" />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="col-md-7">
                <p style={{ color: 'red' }}>Please input the URL</p>
                <input
                  type="url"
                  name="tourist_profilepicture"
                  className="form-control"
                  placeholder="Tourist Profile Picture.."
                  onChange={(e) => setProfile(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Email address</label>
            {data !== null ? (
            <input
              type="email"
              name="tourist_email"
              className="form-control"
              placeholder="Tourist Email.."
              disabled
              value={data.tourist_email}
            />
             ) : (
                  <p>Loading...</p>
                )}
          </div>
          <div className="form-group">
            <label>Location</label>
            {data !== null ? (
            <input
              type="text"
              name="tourist_location"
              className="form-control"
              placeholder="Tourist Location.."
              onChange={(e) => setLocation(e.target.value)}
              value={tourist_location}
            />
          ) : (
            <p>Loading...</p>
          )}
          </div>
          <div className="form-group">
            <label>Name</label>
            {data !== null ? (
            <input
              type="text"
              name="tourist_name"
              className="form-control"
              placeholder="Tourist Name.."
              onChange={(e) => setName(e.target.value)}
              value={tourist_name}
            />
          ) : (
            <p>Loading...</p>
          )}
          </div>
          <div>
            <button className="submit btn btn-warning form-control mt-3" onClick={editTourist}>
              Edit Tourist
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditTourist;

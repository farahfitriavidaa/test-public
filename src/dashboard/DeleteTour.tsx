import Header from '../components/HeaderDashboard'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

interface TouristData {
  id: string;
  createdat: string;
  tourist_email: string;
  tourist_name: string;
  tourist_location: string;
  tourist_profilepicture : string;
}

function DeleteTour() {

  const { id } = useParams();
  const [data, setData] = useState<TouristData | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYWY1MTBlLTI3Y2EtNGQ0MS04NjM2LTA5MDcyZGEyM2U1MSIsImVtYWlsIjoiYmFkdUBnbWFpbC5jb20iLCJuYW1lIjoiU2kgQmFkdSIsImlhdCI6MTY5ODk4ODA5NSwiZXhwIjoxNjk5MDc0NDk1fQ.DOhTAsKfgd0duSFn99mxAkY_L0RG1TGgMWndZOewUr0';

  const DeleteTour = async () => {
    try {
      interface RequestBody {
        tourist_location?: string;
        tourist_name?: string;
        tourist_profilepicture?: string;
      }
      
    const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
    });

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          setError('Delete tourist error: ' + result.error);
        } else {
          localStorage.setItem('user-info', JSON.stringify(result));
          navigate('/list');
        }
      } else {
        const errorData = await response.json();
        setError('Delete tourist error: ' + errorData.error);
      }
    } catch (error) {
      setError('Network error: ' + error);
    }
  };

  useEffect(() => {

    if(!localStorage.getItem('user-info')){
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
          console.log('Data by ID:', result);
          setData(result); // Simpan data ke dalam state
        } else {
          console.error('Error fetching data by ID');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="DeleteTour">
      <Header />
      <h1 className="Font-Custom mx-5 mt-5">Delete Tourist</h1>
      <div className="card w-75 mx-5">
          <div className="card-header d-flex">
          <h5 className="w-75 mt-2">Are You Sure This Data Will Be Deleted?</h5>
          <p className="w-25 justify-content-end" style={{fontSize:'15px'}}></p>
          </div>  
        <div className="card-body">
        <div key={data ? data.id: 'Loading...'}>
        <div className="card-header">
          <p>Created At: {data ? data.createdat: 'Loading...'}</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2 text-center">
              <img src={data ? data.tourist_profilepicture: 'Loading...'} alt="image-tourist" className="rounded-circle" />
            </div>
            <div className="col-lg-6">
              <h5 className="card-title">Tourist Email:{data ? data.tourist_email: 'Loading...'}</h5>
              <p className="card-text">Tourist Name: {data ? data.tourist_name: 'Loading...'}</p>
              <p className="card-text">Tourist Location:{data ? data.tourist_location: 'Loading...'}</p>
            </div>
          </div>
        </div>
        <Link to='/list'>
                <button className="submit btn btn-primary form-control mt-3 w-25 mx-3">
                No
                </button>
            </Link>
            <button className="w-25 submit btn btn-danger form-control mt-3" onClick={DeleteTour}>
              Yes, I'm Sure
            </button>
      </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
  export default DeleteTour;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface IItemProps {
  id: number;
  text: string;
}

interface TouristData {
  id: string;
  createdat: string;
  tourist_email: string;
  tourist_name: string;
  tourist_location: string;
  tourist_profilepicture : string;
}

const Item: React.FC<IItemProps> = (props) => {
  const [data, setData] = useState<TouristData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYWY1MTBlLTI3Y2EtNGQ0MS04NjM2LTA5MDcyZGEyM2U1MSIsImVtYWlsIjoiYmFkdUBnbWFpbC5jb20iLCJuYW1lIjoiU2kgQmFkdSIsImlhdCI6MTY5ODk4ODA5NSwiZXhwIjoxNjk5MDc0NDk1fQ.DOhTAsKfgd0duSFn99mxAkY_L0RG1TGgMWndZOewUr0';
        const response = await fetch('https://biroperjalanan.datacakra.com/api/Tourist?page=203', {
          headers: {
            'Authorization': token, // Tambahkan token bearer ke header
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          console.error('Error fetching data@');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    fetchData();
  }, []);  

  return (
    <div className="card mb-3">
    {data.map((item) => (
      <div key={item.id}>
        <div className="card-header">
          <p>Created At: {item.createdat}</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2 text-center">
              <img src={item.tourist_profilepicture} alt="image-tourist" className="rounded-circle" />
            </div>
            <div className="col-lg-6">
              <h5 className="card-title">Tourist Email: {item.tourist_email}</h5>
              <p className="card-text">Tourist Name: {item.tourist_name}</p>
              <p className="card-text">Tourist Location: {item.tourist_location}</p>
              <Link to={`/detail-list/${item.id}`}>
                <button type="button" className="btn btn-success mx-2">
                  Detail
                </button>
              </Link>
              <Link to={`/edit-tourist/${item.id}`}>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
              </Link>
              <Link to={`/delete-tourist/${item.id}`}>
                <button type="button" className="btn btn-danger mx-2">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Item;

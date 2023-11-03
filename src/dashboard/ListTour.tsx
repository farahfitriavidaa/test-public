import Header from '../components/HeaderDashboard';
import Item from './Item'
import Pagination from './Pagination'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ListTour(){
  const history = useNavigate();
  
  useEffect(() => {
    if(!localStorage.getItem('user-info')){
      history('/login');
    }
  },[])

    const exampleData = Array(50).fill(0).map((_, i) => ({
                id: i + 1,
                text: "Item " + (i + 1)
    }));
        
  return (
    <div className="ListTour">
      <Header/> 
        <h1 className="Font-Custom mx-5 mt-3"><u>List Tourist</u></h1>
        <div className="col-md-5 mx-5">
          <Link to="/add-tourist"><button className="btn btn-success">
            + Add Tourist
          </button>
          </Link>
        </div>
        <div className="mx-5" style={{width:'85%'}}>
      <Pagination data={exampleData} pageSize={10} children={<Item {...exampleData[0]} />} />
        </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
  export default ListTour;

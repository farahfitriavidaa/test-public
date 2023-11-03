import Header from '../components/HeaderDashboard';
import userImg from '../assets/user.png'
import { useNavigate } from 'react-router-dom';
;

function Profil() {

    function logOut() {
        localStorage.clear();
        history('/login');
      }
    const history = useNavigate();
    const user = localStorage.getItem('user-info');
    let userName = localStorage.getItem('user');
    let userEmail = localStorage.getItem('email');
    let userToken = localStorage.getItem('token');
    let userID = localStorage.getItem('id');
    let name = userName?.substring(1, userName.length - 1);
    let email = userEmail?.substring(1, userEmail.length - 1);
    let token = userToken?.substring(1, userToken.length - 1);
    let id = userID?.substring(1, userID.length - 1);
    console.log(user);
    console.log(email);
    console.log(token);
    console.log(id);
    
    return (
    <div className="Profil">
      <Header/> 
      <section>
                <div className="container py-5">
                    <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={userImg} alt="avatar" className="rounded-circle img-fluid w-25"/>
                            <h5 className="my-3">{name}</h5>
                            <p className="text-muted mb-1">{email}</p>
                            <p className="text-muted mb-4" style={{fontSize:'8px'}}>{id}</p>
                            <div className="d-flex justify-content-center mb-2">
                            {user !== null ? (
                            <button className="btn btn-dark" onClick={logOut}>Logout</button>
                            ) : null}
                            </div>
                        </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i className="fas fa-globe fa-lg text-warning"></i>
                                <p className="mb-0">Website</p>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i className="fab fa-github fa-lg"></i>
                                <p className="mb-0">Instagram</p>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i className="fab fa-twitter fa-lg"></i>
                                <p className="mb-0">WhatsApp</p>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <p className="text-center text-justify">Liburan adalah waktu yang sangat dinantikan oleh banyak orang. Ini adalah momen di mana kita bisa melarikan diri dari rutinitas sehari-hari, pekerjaan, dan kewajiban lainnya. Selama liburan, kita memiliki kesempatan untuk bersantai, menjelajahi tempat-tempat baru, mencoba makanan lezat, dan menciptakan kenangan yang tak terlupakan bersama keluarga dan teman-teman.
                                    <br />
                                Selama liburan, kita dapat mengejar hobi, seperti hiking, berenang, atau berkemah di alam terbuka, atau hanya menikmati waktu luang dengan membaca buku favorit, menonton film, atau tiduran sepanjang hari. Liburan juga memberi kita kesempatan untuk belajar tentang budaya dan sejarah di tempat-tempat yang kita kunjungi, serta berinteraksi dengan orang-orang dari latar belakang yang berbeda.
                                    <br />
                                Dalam dunia yang serba sibuk, liburan adalah peluang untuk meremajakan diri, melepaskan stres, dan mengisi ulang energi. Bagi banyak orang, liburan adalah saat terbaik dalam setahun, di mana mereka dapat merayakan hidup dan mengejar kebahagiaan. Liburan adalah waktu yang penuh warna, kegembiraan, dan kebebasan, yang membuatnya menjadi salah satu aspek yang sangat berharga dalam kehidupan kita.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
    </div>
  );
}

export default Profil;

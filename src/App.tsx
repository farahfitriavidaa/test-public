import './App.css';
import Header from './components/Header'
import ImageSlider from './components/ImageSlider'
import imageBg from './assets/around-world.png'
import logoImage from './assets/logo-app2.png'
import HeaderDashboard from './components/HeaderDashboard';

function App() {
  return (
    <div className="App">
      {localStorage.getItem('user-info') ? (
          <HeaderDashboard />
        ) : (
          <Header />
        )}
      {/* Start content */}
      <div className="row">
        <div className="col-lg-6">
          <img src={imageBg} className="Image-Bg" alt="Around The World"/>
        </div>
        <div className="col-lg-5">
          <h2 className="Font-Custom Title">Make your plan easy to around the world with..</h2>
          <div className="Bg-Logo">
            <img src={logoImage} alt="Logo" className="Logo"/>
          </div>
          <div className="Font-Custom Button-Join">Join Now →</div>
        </div>
      </div>
      <div className="Page-Tour mb-4">
        <ImageSlider />
      </div>
      {/* End content */}
    </div>
  );
}

export default App;

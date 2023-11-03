import '../App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tour1 from '../assets/yogyakarta.jpg'
import tour2 from '../assets/bali.jpg'
import tour3 from '../assets/nusa-penida.jpg'
import tour4 from '../assets/papua.jpg'
import tour5 from '../assets/jakarta.jpg'
import tour6 from '../assets/laut.jpg'
import tour7 from '../assets/rumah.jpg'
import tour8 from '../assets/harimau.jpg'


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

function ImageSlider() {
  return (
    <Slider {...sliderSettings}>
      <img src={tour1} alt="Yogyakarta" className="border w-75"/>
      <img src={tour2} alt="Bali" className="border w-75"/>
      <img src={tour3} alt="Nusa Penida" className="border w-75" />
      <img src={tour4} alt="Papua" className="border w-75" />
      <img src={tour5} alt="Jakarta" className="border w-75" />
      <img src={tour6} alt="Lampung" className="border w-75" />
      <img src={tour7} alt="Karimun Jawa" className="border w-75" />
      <img src={tour8} alt="Sumatra" className="border w-75" />
    </Slider>
  );
}

export default ImageSlider;

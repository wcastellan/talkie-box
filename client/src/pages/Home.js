import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from '../assets/alien.png';
import Carousel2 from '../assets/backtothefuture.jpg';
import Carousel3 from '../assets/marleyandme.jpg';

const Home = () => {
  return (
    <div>
      <Carousel class="carousel">
        <Carousel.Item class="carousel-item">
          <img
            className="d-block"
            src={Carousel1}
            alt="Alien Movie Poster"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block justify-content-center align-items-center"
            src={Carousel2}
            alt="Back to the Future Movie Poster"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Carousel3}
            alt="Marley and Me Movie Poster"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
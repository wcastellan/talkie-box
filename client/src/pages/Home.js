import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from '../assets/alien.png';
import Carousel2 from '../assets/backtothefuture.jpg';
import Carousel3 from '../assets/marleyandme.jpg';

const Home = () => {
  return (
    <div>
      <Carousel class="carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Carousel1}
            alt="First slide"
            style={{ height: 800 }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Carousel2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Carousel3}
            alt="Gone With the Wind Movie Poster"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1>Welcome to talkie-box.</h1>
      <section>
        <h2>What are you watching and playing?</h2>
        <p>Share progress you've made in television series you're watching and in games you're playing. Let your friends know whether that media is HOT or NOT.</p>
      </section>
      <section>
        <h2>What are your friends watching and playing?</h2>
        <p>Chances are your friends might be consuming the same media as you. Find out what they are labeling as HOT or NOT.</p>
      </section>
    </div>
  );
};

export default Home;
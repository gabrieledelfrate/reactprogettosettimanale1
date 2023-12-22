// MY ENDPOINT : http://www.omdbapi.com/?i=tt3896198&apikey=6c1a4b3&s=star%20wars
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

const TrendingCarousel2 = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    // Effettua la richiesta all'API
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=dd258d70&s=star%20wars')
      .then(response => {
        // Imposta i dati ottenuti dal server nello stato
        setCarouselData(response.data.Search);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  }, []);

  const images = carouselData.map(item => item.Poster);
  const [selectedImage, setSelectedImage] = useState(null);


const handleImageHover = (index) => {
  setSelectedImage(index);
};

  return (
    <div className="movie-gallery mx-md-5 mb-5 mt-4">
      <h5 className="text-light mt-2 mb-2">Trending Now</h5>
      <Carousel id="trending-now" controls={true}>
        <Carousel.Item>
          <div className="movie-row">
            <div className="row g-1 ">
              {images.slice(0, 5).map((image, index) => (
                <div className="col-md-2 mx-3 my-3" key={index}>
                  <img className={`copertinafilm ${selectedImage === index ? 'zoomed' : ''}`} src={image} alt={`Media ${index + 1}`} 
                   onMouseEnter={() => handleImageHover(index)}
                   onMouseLeave={() => setSelectedImage(null)}/>
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="movie-row">
            <div className="row g-1 ">
              {images.slice(5, 10).map((image, index) => (
                <div className="col-md-2 mx-3 my-3 " key={index}>
                  <img className={`copertinafilm ${selectedImage === index ? 'zoomed' : ''}`} src={image} alt={`Media ${index + 1}`} 
                  onMouseEnter={() => handleImageHover(index)}
                  onMouseLeave={() => setSelectedImage(null)}/>
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default TrendingCarousel2;

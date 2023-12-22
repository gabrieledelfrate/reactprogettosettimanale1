import React, { useState, useEffect } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import axios from 'axios';

const token = '{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTdjY2I5ODkwODAwMTg0ODg3NmMiLCJpYXQiOjE3MDMyNTM5NjQsImV4cCI6MTcwNDQ2MzU2NH0.L19PiEdWEHhQr4ibETR46bhBNToBgd0z0rxYZEir7Sc}';

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
 key: "value"
};

const TrendingCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=dd258d70&s=harry%20potter')
      
      .then(response => {
        setCarouselData(response.data.Search);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  }, []);

  const handleImageHover = (index) => {
    setSelectedImage(index);
  };

  const handleImageClick = async (movieID) => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTdjY2I5ODkwODAwMTg0ODg3NmMiLCJpYXQiOjE3MDMyNTM5NjQsImV4cCI6MTcwNDQ2MzU2NH0.L19PiEdWEHhQr4ibETR46bhBNToBgd0z0rxYZEir7Sc'
        }
      };
      const response = await axios.get(`https://striveschool-api.herokuapp.com/api/comments/${movieID}`,config);
      
      
      
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei commenti:', error);
    }
  };
  console.log(selectedMovie)
  const images = carouselData.map(item => item.Poster);
  const selectedMovieArray = []
  selectedMovieArray.push('selectedMovie')


  const submitComment = async (e) => {
    e.preventDefault();
  
    const COMMENTS_URL = 'https://striveschool-api.herokuapp.com/api/comments/';
  
    try {
      const response = await fetch(COMMENTS_URL, {
        method: 'POST',
        body: JSON.stringify({ ...newComment, elementId: imdbID }),
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTdjY2I5ODkwODAwMTg0ODg3NmMiLCJpYXQiOjE3MDMyNTM5NjQsImV4cCI6MTcwNDQ2MzU2NH0.L19PiEdWEHhQr4ibETR46bhBNToBgd0z0rxYZEir7Sc',
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        alert('Comment added');
        fetchComments(); // aggiorna la lista dei commenti con il nuovo aggiunto
  
        // nel frattempo resettiamo i campi del form per aspettare un nuovo commento
        setNewComment({
          Comment: '',
          rate: '3',
          elementId: imdbID
        });
      } else {
        alert('An error has occurred');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      Comment: e.target.value
    });
  };


  return (
    <div className="movie-gallery mx-md-5 mb-5 mt-4">
       <h5 className="text-light mt-2 mb-2">Harry Potter</h5>
      <Carousel id="trending-now" controls={true}>
        <Carousel.Item>
          <div className="movie-row">
            <div className="row g-1 ">
              {images.slice(0, 5).map((image, index) => (
                <div className="col-md-2 mx-3 my-3" key={index}>
                  <img
                    className={`copertinafilm ${selectedImage === index ? 'zoomed' : ''}`}
                    src={image}
                    alt={`Media ${index + 1}`}
                    onMouseEnter={() => handleImageHover(index)}
                    onMouseLeave={() => setSelectedImage(null)}
                    onClick={() => handleImageClick(carouselData[index].imdbID)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="movie-row">
            <div className="row g-1 ">
              {images.slice(5, 10).map((image, index) => (
                <div className="col-md-2 mx-3 my-3" key={index}>
                  <img
                    className={`copertinafilm ${selectedImage === index ? 'zoomed' : ''}`}
                    src={image}
                    alt={`Media ${index + 1}`}
                    onMouseEnter={() => handleImageHover(index)}
                    onMouseLeave={() => setSelectedImage(null)}
                    onClick={() => handleImageClick(carouselData[index].imdbID)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
        
      </Carousel>

      
        <Modal show={selectedMovie !== null} onHide={() => setSelectedMovie(null)}>
          <Modal.Header closeButton>
           <Modal.Title>{selectedMovie?.title}</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <form onSubmit={submitComment}>
      <input
        type="text"
        value={newComment.Comment}
        onChange={handleCommentChange}
        placeholder="Inserisci il tuo commento"
      />
      <button type="submit">Invia Commento</button>
    </form>
           <p>Anno: {carouselData?.year}</p>
            {selectedMovie?.comments ? selectedMovie.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            )) : <p></p>}
          </Modal.Body>
</Modal>
    </div>
  );
};

export default TrendingCarousel;
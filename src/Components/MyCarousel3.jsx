import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TrendingCarousel3 = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  

  useEffect(() => {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=dd258d70&s=avengers')
      
      .then(response => {
        setCarouselData(response.data.Search);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  }, []);

  const images = carouselData.map(item => item.Poster);

  const handleImageHover = (index) => {
    setSelectedImage(index);
  };

  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleImageClick = (movieId) => {
    setSelectedMovie(movieId);
    const config = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTdjY2I5ODkwODAwMTg0ODg3NmMiLCJpYXQiOjE3MDMyNTM5NjQsImV4cCI6MTcwNDQ2MzU2NH0.L19PiEdWEHhQr4ibETR46bhBNToBgd0z0rxYZEir7Sc'
      }
    };
    axios.get(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, config)
      .then(response => {
        setComments(response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  };

  const [newComment, setNewComment] = useState('');

  const handleAddComment = (movieId) => {
    const commentData = {
      comment: newComment,
      rate: 5,
      elementId:`${movieId}`,
    };
    const config = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTdjY2I5ODkwODAwMTg0ODg3NmMiLCJpYXQiOjE3MDMyNTM5NjQsImV4cCI6MTcwNDQ2MzU2NH0.L19PiEdWEHhQr4ibETR46bhBNToBgd0z0rxYZEir7Sc'
      }
    };

    axios.post(`https://striveschool-api.herokuapp.com/api/comments/`, commentData, config)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };  
  
  return (
    <div className="movie-gallery mx-md-5 mb-5 mt-4">
       <h5 className="text-light mt-2 mb-2">Avengers</h5>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.map((comment, index) => (
            <p key={index}>{comment.comment}</p>
          ))}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Nuovo commento</Form.Label>
              <Form.Control as="textarea" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={() => handleAddComment(selectedMovie)}>
              Aggiungi commento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TrendingCarousel3;
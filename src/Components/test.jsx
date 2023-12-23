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
        fetchComments();
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
  
  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      Comment: e.target.value
    });
  };

  onClick={() => handleImageClick(carouselData[index].imdbID)}
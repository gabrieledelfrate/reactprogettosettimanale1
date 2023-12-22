import React from 'react';

const TvShowsComponent = () => {
  return (
    <div className="d-flex align-items-center">
      <h1 className="text-left text-white mr-auto p-3 flex-grow-1">TV Shows</h1>
      <div className="genre-box">
        <select name="genres" id="genres">
          <option value="">Action and Adventure</option>
          <option value="">Anime</option>
          <option value="">Children & Family</option>
          <option value="">Classic</option>
          <option value="">Comedies</option>
          <option value="">Documentaries</option>
          <option value="">Dramas</option>
          <option value="">Horror</option>
          <option value="">Music</option>
          <option value="">Romantic</option>
          <option value="">Sci-fi & Fantasy</option>
          <option value="">Sports</option>
          <option value="">Thrillers</option>
          <option value="">Tv</option>
        </select>
      </div>
    </div>
  );
};

export default TvShowsComponent;

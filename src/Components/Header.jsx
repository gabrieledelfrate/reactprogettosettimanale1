import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';
import { Modal, ListGroup } from 'react-bootstrap';

const Header = () => {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);        
    }
    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const apiKey = 'dd258d70';
        const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.Search) {
                setSearchResults(data.Search);
                setShowModal(true); // Mostra il modale quando ci sono risultati
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Errore durante la ricerca dei film:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };




    return (        
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="assets/netflix_logo.png" alt="logo"/>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">TV Shows</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">Recently Added</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">My List</a>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto" onSubmit={handleSearchSubmit}>
                        <a href="#" id="searchIcon" onClick={toggleSearch}>
                        <Search className="text-white" />
                        </a>
                        <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchInputChange}
                        className={`form-control ${isSearchVisible ? 'd-block' : 'd-none'}`}
                        placeholder="Search..."
                        />
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#">KIDS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <Bell className= "text-white" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./indexProfile.html">
                               <img src="assets/avatar.png" alt="avatar"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {searchResults.length > 0 ? (
                        <ListGroup>
                            {searchResults.map((result) => (
                                <ListGroup.Item key={result.imdbID}>
                                    {result.Title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No results found</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeModal}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </nav>
    );
};

export default Header;

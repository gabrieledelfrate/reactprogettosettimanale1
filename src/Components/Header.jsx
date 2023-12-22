import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';

const Header = () => {
    const [isSearchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    }
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
                    <form className="d-flex ms-auto">
                        <a href="#" id="searchIcon" onClick={toggleSearch}>
                        <Search className="text-white" />
                        </a>
                        <input
                        type="text"
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
        </nav>
    );
};

export default Header;

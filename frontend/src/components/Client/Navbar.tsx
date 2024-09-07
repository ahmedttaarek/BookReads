// Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom" style={{ borderBottom: '1px solid #000' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home/books" style={{ color: '#000' }}>Library</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/books" style={{ color: '#000' }}>Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/categories" style={{ color: '#000' }}>Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/authors" style={{ color: '#000' }}>Authors</Link>
                        </li>
                    </ul>
                    <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ height: 'calc(1.5em + .75rem + 2px)', borderColor: '#000' }} // Match the height and add border color
                        />
                        <button 
                            className="btn btn-outline-dark" 
                            type="submit"
                            style={{ height: 'calc(1.5em + .75rem + 2px)', borderColor: '#000' }} // Match the height and add border color
                        >
                            Search
                        </button>
                    </form>
                    <div className="d-flex align-items-center">
                        <Link to="/user-dashboard" className="nav-link p-2" style={{ color: '#000' }}>
                            <FaUser size={30} />
                        </Link>
                        <Link to="/" className="nav-link p-2" style={{ color: '#000' }}>
                            <FaSignOutAlt size={30} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

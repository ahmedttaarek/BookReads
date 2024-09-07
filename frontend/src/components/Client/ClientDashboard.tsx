// ClientDashboard.tsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './ClientDashboard.css';
import Navbar from './Navbar';

const ClientDashboard: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setMenuOpen(false); // Close menu when an option is clicked
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        if (menuOpen) setMenuOpen(false);
    };

    const renderTable = () => (
        <table className="table">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Avg Rate</th>
                    <th>Rating</th>
                    <th>Shelve</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="https://via.placeholder.com/60" alt="Book Cover" /></td>
                    <td>Book Name</td>
                    <td>Author Name</td>
                    <td>4.5</td>
                    <td>4/5</td>
                    <td>{selectedOption}</td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    );

    return (
        <div className="client-dashboard" onClick={closeMenu}>
            <Navbar /> {/* Include Navbar */}
            <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <FaBars className="dropdown-icon" size={32} onClick={toggleMenu} />
                <div className={`dropdown-menu-custom ${menuOpen ? 'show' : ''}`}>
                    <a className="dropdown-item" href="#" onClick={() => handleOptionClick('All')}>All</a>
                    <a className="dropdown-item" href="#" onClick={() => handleOptionClick('Read')}>Read</a>
                    <a className="dropdown-item" href="#" onClick={() => handleOptionClick('Currently Reading')}>Currently Reading</a>
                    <a className="dropdown-item" href="#" onClick={() => handleOptionClick('Want to Read')}>Want to Read</a>
                </div>
            </div>
            <div className="content">
                <h2>{selectedOption} Books</h2>
                {renderTable()}
            </div>
        </div>
    );
};

export default ClientDashboard;

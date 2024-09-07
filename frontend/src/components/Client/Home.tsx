// Home.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList'; // Import the BookList component
import './Home.css';
import Category from './Category';
import AuthorList from './AuthorList';

export const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="home-main">
        <h1 className="home-title">Welcome to our library</h1>
        <h2 className="home-subtitle">
          Here you'll find special categories and books by renowned authors
        </h2>

        {/* Set up routes to render different components based on the path */}
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/authors" element={<AuthorList />} />
          
          {/* You can add more routes here for categories, authors, etc. */}
        </Routes>
      </main>
    </div>
  );
};

export default Home;

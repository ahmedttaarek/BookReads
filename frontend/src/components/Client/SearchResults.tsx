import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';

interface Book {
  _id: string;
  name: string;
  photo: string;
}

interface Author {
  _id: string;
  name: string;
  photo: string;
}

interface Category {
  _id: string;
  name: string;
}

const SearchResults: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(useLocation().search).get('query') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const [booksResponse, authorsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/books', { params: { search: query } }),
          axios.get('http://localhost:5000/authors', { params: { search: query } }),
          axios.get('http://localhost:5000/categories', { params: { search: query } })
        ]);
        setBooks(booksResponse.data);
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch search results.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Search Results for "{query}"</h1>

        {books.length > 0 && (
          <div>
            <h2>Books</h2>
            <div className="row">
              {books.map((book) => (
                <div key={book._id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={book.photo || 'default-book-image-url'}
                      alt={book.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.name}</h5>
                      <Link to={`/books/${book._id}`} className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {authors.length > 0 && (
          <div className="mt-4">
            <h2>Authors</h2>
            <div className="row">
              {authors.map((author) => (
                <div key={author._id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={author.photo || 'default-author-image-url'}
                      alt={author.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{author.name}</h5>
                      <Link to={`/authors/${author._id}`} className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <div className="mt-4">
            <h2>Categories</h2>
            <div className="row">
              {categories.map((category) => (
                <div key={category._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                      <Link to={`/categories/${category._id}`} className="btn btn-primary">
                        View Books
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(books.length === 0 && authors.length === 0 && categories.length === 0) && (
          <div className="mt-4">
            <p>No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
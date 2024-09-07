import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './AuthorDetails.css'; // Ensure the filename matches

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

const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (!id) {
        setError('Author ID is missing.');
        setLoading(false);
        return;
      }

      try {
        // Fetch the author details
        const authorResponse = await axios.get(`http://localhost:5000/authors/${id}`);
        setAuthor(authorResponse.data);

        // Fetch the books by this author
        const booksResponse = await axios.get('http://localhost:5000/books', {
          params: { author: id }
        });
        setBooks(booksResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch author details.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      {author ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <img 
                src={author.photo || 'default-author-image-url'} 
                alt={author.name} 
                className="img-fluid" 
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <h2 className="mt-2">{author.name}</h2>
            </div>
            <div className="col-md-8">
              <h3>Books by {author.name}</h3>
              {books.length > 0 ? (
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
              ) : (
                <p>No books available for this author.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No author details available.</div>
      )}
    </div>
  );
};

export default AuthorDetails;

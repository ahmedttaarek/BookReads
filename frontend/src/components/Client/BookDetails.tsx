import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './BookDetails.css'; // Ensure this file exists for styling

interface Author {
  name: string;
}

interface Category {
  name: string;
}

interface Book {
  _id: string;
  photo: string;
  name: string;
  author_id: Author;
  category_id: Category;
  detailsUrl: string;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Book ID:', id); // Log the ID to ensure it's captured

    const fetchBookDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:5000/books/${id}`);
          // Ensure the response data matches the Book interface
          setBook(response.data);
        } else {
          setError('Book ID is missing.');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch book details.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      {book ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <img src={book.photo} alt={book.name} className="img-fluid" />
            </div>
            <div className="col-md-8">
              <h2>{book.name}</h2>
              <p><strong>Author:</strong> {book.author_id?.name || 'Unknown'}</p>
              <p><strong>Category:</strong> {book.category_id?.name || 'Unknown'}</p>
              <div className="button-container">
                <a href={book.detailsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read
                </a>
                <button className="btn btn-secondary">
                  Want to Read for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No book details available.</div>
      )}
    </div>
  );
};

export default BookDetails;

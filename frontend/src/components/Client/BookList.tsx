import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'animate.css';
import './BookList.css';


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
  detailsUrl: string; // Add this line for the book details URL
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        const updatedBooks = response.data.map((book: Book) => ({
          ...book,
        
        }));
        setBooks(updatedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="mb-4">Books</h1>
      {books.length === 0 ? (
        <div>No books available.</div>
      ) : (
        <div className="book_container">
          {books.map(book => (
            <div className="animate__animated animate__fadeIn" key={book._id}>
              <div className="book_card">
                <img
                  src={book.photo}
                  className="card-img-top"
                  alt={book.name}
                  style={{ height: '258px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text">Author: {book.author_id?.name || 'Unknown'}</p>
                  <p className="card-text">Category: {book.category_id?.name || 'Unknown'}</p>
                  <Link to={`/books/${book._id}`} className="btn btn-primary">
                        View Details
                      </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;

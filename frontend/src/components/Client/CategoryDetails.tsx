import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './CategoryDetails.css';

interface Book {
  _id: string;
  name: string;
  photo: string;
  author: string;
}

interface Category {
  _id: string;
  name: string;
  books: Book[];
}

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
        setError('Invalid Category ID.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/categories/${id}`);
        setCategory(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch category details.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      {category ? (
        <div className="container mt-4">
          <h1 className="mt-2">{category.name}</h1>
          <h3>Books in {category.name}</h3>
          {category.books.length > 0 ? (
            <div className="row">
              {category.books.map((book) => (
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
                      <p className="card-text">
                        <strong>Author:</strong> {book.author || 'Unknown'}
                      </p>
                      <Link to={`/books/${book._id}`} className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books available in this category.</p>
          )}
        </div>
      ) : (
        <div>No category details available.</div>
      )}
    </div>
  );
};

export default CategoryDetails;

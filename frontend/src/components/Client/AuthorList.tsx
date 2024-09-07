import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'animate.css';
import './Author.css';

interface Author {
  _id: string;
  name: string;
  photo: string;
}

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/authors');
        setAuthors(response.data);
      } catch (err) {
        console.error('Error fetching authors:', err);
        setError('Failed to fetch authors.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="mb-4">Authors</h1>
      {authors.length === 0 ? (
        <div>No authors available.</div>
      ) : (
        <div className="author_container">
          {authors.map((author) => (
            <div key={author._id} className="animate__animated animate__fadeInUp">
              <div className="author-card">
                <img
                  src={author.photo}
                  className="card-img-top"
                  alt={author.name}
                  style={{ height: '258px', objectFit: 'cover' }}
                />
                <h5 className="author-name">{author.name}</h5>
                <Link to={`/authors/${author._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorList;

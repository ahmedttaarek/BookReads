import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'animate.css';
import "./Category.css";

interface Book {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  books: Book[];
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="mb-4">Categories</h1>
      {categories.length === 0 ? (
        <div>No Categories available.</div>
      ) : (
        <div className="category_container">
          {categories.map(category => (
            <div className="animate__animated animate__fadeIn" key={category._id}>
              <div className="category_card">
                <h5 className="card-title">{category.name}</h5>
                <Link to={`/categories/${category._id}`} className="btn btn-primary">
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

export default Category;

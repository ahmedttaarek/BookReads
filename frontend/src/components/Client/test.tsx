// Category.tsx
import React, { useEffect, useState } from 'react';
import './Category.css';
import Navbar from './Navbar'; // Ensure Navbar is correctly imported



const Category: React.FC = () => {
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const showDetails = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Category = await response.json();
      alert(`Category: ${data.name}\nBooks: ${data.books.map(book => book.name).join(', ')}`);
    } catch (err) {
      const error = err as Error;
      alert('Error fetching category details: ' + (error.message || 'Unknown error'));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="categories-container">
      <Navbar /> {/* Include Navbar */}
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <div className="no-categories">No categories available.</div>
      ) : (
        <div className="category-grid">
          {categories.map(category => (
            <div key={category._id} className="category-card">
              <h2 className="category-name">{category.name}</h2>
              <button className="details-button" onClick={() => showDetails(category._id)}>
                Show Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;

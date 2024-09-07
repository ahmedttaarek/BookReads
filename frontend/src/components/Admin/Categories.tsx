import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Category {
  _id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  // Retrieve token from localStorage or other storage
  const token = localStorage.getItem('authToken') || '';

  useEffect(() => {
    // Fetch initial categories from the server
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories', {
          headers: { Authorization: `Bearer ${token}` } // Include the token in headers
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]); // Add token as dependency

  const handleDelete = async (_id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/categories/${_id}`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in headers
      });
      setCategories(categories.filter(category => category._id !== _id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddButtonClick = (): void => {
    setShowAddForm(true);
  };

  const handleAddCategory = async (): Promise<void> => {
    if (newCategoryName.trim() === '') {
      alert('Category name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/categories', 
        { name: newCategoryName },
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in headers
      );
      setCategories([...categories, response.data]);
      setNewCategoryName('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(e.target.value);
  };

  const handleCloseForm = (): void => {
    setShowAddForm(false);
    setNewCategoryName('');
  };

  return (
    <div className="container">
      <button onClick={handleAddButtonClick} className="add-button">Add Category</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="card add-form active">
          <button onClick={handleCloseForm} className="close-button">×</button>
          <h2>Add Category</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
            <label>
              Category Name:
              <input 
                type="text"
                value={newCategoryName}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Add Category</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;

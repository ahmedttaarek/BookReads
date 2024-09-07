import React, { useState } from 'react';
import Categories from './Categories';
import Books from './Books';
import Authors from './Authors';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import './AdminDashboard.css';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Categories');
  const navigate = useNavigate(); // Replaces useHistory

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Categories':
        return <Categories />;
      case 'Books':
        return <Books />;
      case 'Authors':
        return <Authors />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-nav">
        <button onClick={() => setActiveTab('Categories')}>Categories</button>
        <button onClick={() => setActiveTab('Books')}>Books</button>
        <button onClick={() => setActiveTab('Authors')}>Authors</button>
        <button onClick={handleLogout} className="logout-button">
          <FiLogOut /> Logout
        </button>
      </nav>
      <div className="admin-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

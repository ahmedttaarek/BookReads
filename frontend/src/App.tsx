import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import WelcomePage from './components/Client/WelcomePage'; 
import Home from './components/Client/Home';
import AuthorList from './components/Client/AuthorList';
import CategoryDetails from './components/Client/CategoryDetails';
import ClientDashboard from './components/Client/ClientDashboard';
import BookDetails from './components/Client/BookDetails';
import AuthorDetails from './components/Client/AuthorDetails';
import SearchResults from './components/Client/SearchResults';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home/*' element={<Home />} />
      
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/authors' element={<AuthorList />} />
        <Route path='/user-dashboard' element={<ClientDashboard />} />
        <Route path='/books/:id' element={<BookDetails />} /> 
       
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/categories/:id" element={<CategoryDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;

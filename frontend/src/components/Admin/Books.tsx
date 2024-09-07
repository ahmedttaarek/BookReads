    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import './Books.css';

    interface Book {
        _id: string;
        name: string;
        photo: string;
        category_id: string;
        author_id: string;
    }

    interface Category {
        _id: string;
        name: string;
    }

    interface Author {
        _id: string;
        name: string;
    }

    const Books: React.FC = () => {
        const [books, setBooks] = useState<Book[]>([]);
        const [categories, setCategories] = useState<Category[]>([]);
        const [authors, setAuthors] = useState<Author[]>([]);
        const [showAddForm, setShowAddForm] = useState<boolean>(false);
        const [newBook, setNewBook] = useState<Omit<Book, '_id'>>({
            name: '',
            photo: '',
            category_id: '',
            author_id: '',
        });

        const token = localStorage.getItem('authToken') || '';

        useEffect(() => {
            const fetchBooks = async () => {
                try {
                    const response = await axios.get<Book[]>('http://localhost:5000/books', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setBooks(response.data);
                } catch (error) {
                    console.error('Error fetching books:', error);
                }
            };

            const fetchCategories = async () => {
                try {
                    const response = await axios.get<Category[]>('http://localhost:5000/categories', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setCategories(response.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            const fetchAuthors = async () => {
                try {
                    const response = await axios.get<Author[]>('http://localhost:5000/authors', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAuthors(response.data);
                } catch (error) {
                    console.error('Error fetching authors:', error);
                }
            };

            fetchBooks();
            fetchCategories();
            fetchAuthors();
        }, [token]);

        const handleDelete = async (_id: string): Promise<void> => {
            try {
                await axios.delete(`http://localhost:5000/books/${_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBooks(books.filter(book => book._id !== _id));
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        };

        const handleAddButtonClick = (): void => {
            setShowAddForm(true);
        };

        const handleAddBook = async (): Promise<void> => {
            if (!newBook.name.trim()) {
                alert('Book name cannot be empty.');
                return;
            }

            try {
                const response = await axios.post<Book>('http://localhost:5000/books', newBook, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBooks([...books, response.data]);
                setNewBook({ name: '', photo: '', category_id: '', author_id: '' });
                setShowAddForm(false);
            } catch (error) {
                console.error('Error adding book:', error);
                alert('Failed to add book. Please try again.');
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
            const { name, value } = e.target;
            setNewBook(prevBook => ({
                ...prevBook,
                [name]: value
            }));
        };

        const handleCloseForm = (): void => {
            setShowAddForm(false);
            setNewBook({ name: '', photo: '', category_id: '', author_id: '' });
        };

        return (
            <div className="container">
                <button onClick={handleAddButtonClick} className="add-button">Add Book</button>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book._id}</td>
                                <td>{book.name}</td>
                                <td>
                                    {book.photo ? (
                                        <img src={book.photo} alt="Book Cover" style={{ width: '50px', height: 'auto' }} />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    {categories.find(category => category._id === book.category_id)?.name || 'Unknown Category'}
                                </td>
                                <td>
                                    {authors.find(author => author._id === book.author_id)?.name || 'Unknown Author'}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showAddForm && (
                    <div className="cards add-form active">
                        <button onClick={handleCloseForm} className="close-button">×</button>
                        <h2>Add Book</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddBook(); }}>
                            <label>
                                Book Name:
                                <input 
                                    type="text"
                                    name="name"
                                    value={newBook.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Photo URL:
                                <input 
                                    type="text"
                                    name="photo"
                                    value={newBook.photo}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Category:
                                <select 
                                    name="category_id"
                                    value={newBook.category_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Author:
                                <select 
                                    name="author_id"
                                    value={newBook.author_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Author</option>
                                    {authors.map(author => (
                                        <option key={author._id} value={author._id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Add Book</button>
                        </form>
                    </div>
                )}
            </div>
        );
    };

    export default Books;

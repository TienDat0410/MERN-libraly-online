import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";
import Moment from 'moment';
import Sidebar from '../admin/Sidebar';

import { MDBDataTable } from 'mdbreact'

const Books = () => {
    //Fetch books
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);
    const bookslist = useSelector(state => state.booksList);
    const { books, loading } = bookslist;
    // End of fetch books
    //Delete book handler
    const handlerDeleteBook = id => {
        dispatch(deleteBook(id));
        alert('Delete Success');
        history('/books');
        window.location.replace('/books');
    };
    return (
        <div>
            {loading && <Loading />}
            {books !== undefined && books.length === 0 ? (
                'No'
            ) : (
                <div className="row mt-5">
                    <div className="col-12 col-md-2 mt-4">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10 mt-5">

                        <h1 className="my-5">All books</h1>
                        <div className='row'>
                            <div className='col'>
                            
                                <table id="example" className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope='col'>Book Name</th>
                                            <th scope='col'>publishedDate</th>
                                            <th scope='col'>genres</th>        
                                            <th scope='col'>unitPrice</th>
                                            <th scope='col'>Book image</th>
                                            <th scope='col'>Action</th>
                                            <th scope='col'>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books &&
                                            books.map(book => {
                                                return (
                                                    <tr key={book._id}>
                                                        <th scope='row'>{book.book_name}</th>
                                                        <td>{Moment(book.publishedDate).calendar()}</td>
                                                        <td>{book.genres}</td>
                                                        {/* <td>{book.author}</td> */}
                                                        <td>{book.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                        <td key={book.book_img.public_id}>

                                                            <img src={book.book_img[0].url} style={{ height: '350px' }} />
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                onClick={() => handlerDeleteBook(book._id)}
                                                                className="btn btn-danger"
                                                                style={{ color: 'white', cursor: 'pointer' }}>Delete</button>
                                                        </td>
                                                        <td>
                                                            <Link to={`/bookupdate/${book && book._id}`}>
                                                                <button
                                                                    type='button'
                                                                    className='btn btn-success'
                                                                    style={{
                                                                        color: 'yellow',
                                                                        cursor: 'pointer',
                                                                    }}>Update</button>
                                                            </Link>
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>

            )}
            
        </div>

    );
};

export default Books;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/loading';

const Books = ({ history }) => {
    //Fetch books
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);
    const bookslist = useSelector(state => state.booksList);
    const { books, loading } = bookslist;
    // End of fetch books
    return (
        <div>
            {loading && <Loading />}
            {books !== undefined && books.length === 0 ? (
                'No'
            ) : (
                <div className='row'>
                    <div className='col'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Book Name</th>
                                    <th scope='col'>publishedDate</th>
                                    <th scope='col'>genres</th>
                                    <th scope='col'>Author</th>
                                    <th scope='col'>unitPrice</th>
                                    <th scope='col'>Book image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books &&
                                    books.map(book => {
                                        return (
                                            <tr  key={book._id}>
                                                <th scope='row'>{book.book_name}</th>
                                                <td>{book.publishedDate}</td>
                                                <td>{book.genres}</td>
                                                <td>{book.author}</td>
                                                <td>{book.unitPrice}</td>
                                                <td>
                                                    <img src={book.book_img}/>
                                                </td>
                                                                               
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;
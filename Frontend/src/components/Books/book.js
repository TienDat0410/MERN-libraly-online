import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";
import Moment from 'moment';

const BookHome = () => {
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
        <>
            {books && books.map(book => {
                return (
                    <div class={`col-sm-12 col-md-6 col-lg-4 my-3`} key={book._id} >
                        <div
                            className="eg-product-carde-alpha shadow-lg "
                            style={{ borderRadius: "20px" }}
                        >
                            <div className="eg-porduct-thumb">
                                <Link to={`/bookDetail/${book && book._id}`} key={book.book_img.public_id} >
                                    <img
                                        className="p-3"
                                        src={book.book_img[0].url}
                                        alt="Product Img"
                                        style={{ width: "100%" }}
                                    />
                                </Link>
                            </div>
                            <div className="eg-porduct-body mt-2">
                                <h5 className="eg-product-title">
                                    <Link to={`/bookDetail/${book && book._id}`}>{book.book_name}</Link>
                                </h5>
                                <div className="eg-product-card-price">
                                    <ins>
                                        <span className="price-amount">
                                            <bdi>{book.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</bdi>
                                        </span>
                                    </ins>
                                </div>

                                <div className="product-card-bottom">

                                    <div className="product-add-btn">
                                        <Link to={`/bookDetail/${book && book._id}`}>
                                            View Details <i className="fa fa-plus"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    );
};

export default BookHome;
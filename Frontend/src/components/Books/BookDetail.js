import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = () => {
    const { id } = useParams();
    const history = useNavigate();

    //Get the book details and fill it in the form
    const bookDetails = useSelector((state) => state.bookDetails);

    const { book, loading } = bookDetails;

    const [book_name, setTitle] = useState(book && book.book_name);
    const [publishedDate, setPublished] = useState(book && !loading && book.publishedDate);
    const [genres, setGenres] = useState(book && !loading && book.genres);
    const [author, setAuthor] = useState(book && !loading && book.author);
    const [unitPrice, setUnitPrice] = useState(book && !loading && book.unitPrice);
    const [quantity, setQuantity] = useState(book && !loading && book.quantity);
    const [book_img, setBook_img] = useState(book && !loading && book.book_img);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBook(id));
    }, [dispatch, id]);

    //dispatch action

    const formSubmitHandler = e => {
        const data = {
            book_name,
            publishedDate,
            genres,
            // author,
            unitPrice,
            quantity,
            book_img,
        };
        e.preventDefault();
        dispatch(updateBook(id, data));
        history('/books');
        window.location.replace('/books');
    };
    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {book ? (
                        <>
                            <h1 className='text-center'>Update</h1>
                            <form onSubmit={formSubmitHandler}>
                                <fieldset>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputPassword1'>title</label>
                                        <input
                                            value={book_name}
                                            onChange={e => setTitle(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputPassword1'
                                            placeholder='Book title'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='exampleInputPublishedDate'>PublishedDate </label>
                                        <input
                                            value={publishedDate}
                                            onChange={e => setPublished(e.target.value)}
                                            type='Date'
                                            className='form-control'
                                            id='exampleInputPublishedDate'
                                            aria-describedby='emailHelp'
                                            placeholder='PublishedDate'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='exampleInputGenres'>Genres </label>
                                        <input
                                            value={genres}
                                            onChange={e => setGenres(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputGenres'
                                            aria-describedby='emailHelp'
                                            placeholder='Genres'
                                        />
                                    </div>

                                    {/* <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1'>Author </label>
                                        <input
                                            value={author}
                                            onChange={e => setAuthor(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            placeholder='Author name'
                                        />
                                    </div> */}

                                    <div className='form-group'>
                                        <label htmlFor='exampleInputUnitPrice'>UnitPrice </label>
                                        <input
                                            value={unitPrice}
                                            onChange={e => setUnitPrice(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputUnitPrice'
                                            aria-describedby='emailHelp'
                                            placeholder='UnitPrice'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='exampleInputQuantity'>Quantity </label>
                                        <input
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='exampleInputQuantity'
                                            aria-describedby='emailHelp'
                                            placeholder='Quantity'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='formFileMultiple' className="form-label mt-4"> Choose Book picture </label>
                                        {/* <input
                                                    value={book_img}
                                                    onChange={e => setBook_img(e.target.value)}
                                                    type='file'
                                                    className='form-control'
                                                    id='fo
                                                    rmFileMultiple'd
                                                /> */}
                                        <input
                                            value={book_img}
                                            onChange={e => setBook_img(e.target.value)}
                                            type='text'
                                            className='form-control'
                                            id='formFileMultiple'
                                        />
                                    </div>
                                    <button type='submit' className='btn btn-dark m-auto'>
                                        Update Book
                                    </button>
                                </fieldset>
                            </form>
                        </>
                    ) : (
                        'No'
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
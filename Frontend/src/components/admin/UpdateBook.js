import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_BOOK_RESET } from '../../redux/actions/actionsTypes';
import { clearErrors, fetchBook, updateBook } from '../../redux/actions/books/bookActions';
import Sidebar from './Sidebar';


const UpdateBook = ({ match }) => {
    const history = useNavigate();
    const [book_name, setbook_name] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [genres, setGenres] = useState('');
    //
    // const [authorName, setAuthor] = useState('');
    //
    const [unitPrice, setUnitPrice] = useState(0);
    const [stock, setStock] = useState('0');
    const [book_img, setBookImages] = useState([]);

    const [oldBook_images, setOldBookImages] = useState([]);
    const [book_imgPreview, setBook_imgPreview] = useState([]);


    const dispatch = useDispatch();

    const bookDetails = useSelector((state) => state.bookDetails);
    const { error, book } = bookDetails;

    const { loading, error: updateError, isUpdated } = useSelector(state => state.bookUpdateAndDelete);

    const { id } = useParams();

    useEffect(() => {
        if (book && book._id !== id) {
            dispatch(fetchBook(id));
        } else {
            setbook_name(book && book.book_name);
            setPublishedDate(book && book.publishedDate)
            setGenres(book && book.genres);
            setUnitPrice(book && book.unitPrice);
            setStock(book && book.stock)
            setOldBookImages(book && book.book_img)
        }
        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history('/getallbook');
            alert('Book updated successfully');
            dispatch({ type: UPDATE_BOOK_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, book, id])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("book_name", book_name);
        formData.set("publishedDate", publishedDate);
        formData.set("genres", genres);
        // formData.set("author", authorName);
        formData.set("unitPrice", unitPrice);
        formData.set("stock", stock);


        book_img.forEach(image => {
            formData.append('book_img', image)
        })

        dispatch(updateBook(book._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setBook_imgPreview([]);
        setBookImages([]);
        setOldBookImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setBook_imgPreview(oldArray => [...oldArray, reader.result])
                    setBookImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-12 col-md-2 mt-4">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 mt-5">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Books</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Book Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={book_name}
                                        onChange={(e) => setbook_name(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='exampleInputPublishedDate'>PublishedDate </label>
                                    <input
                                        value={publishedDate}
                                        onChange={e => setPublishedDate(e.target.value)}
                                        type='Date'
                                        className='form-control'
                                        id='exampleInputPublishedDate'
                                        placeholder='PublishedDate'
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="genres_field">Genres</label>
                                    <input
                                        type="text"
                                        id="genres_field"
                                        className="form-control"
                                        value={genres}
                                        onChange={(e) => setGenres(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={unitPrice}
                                        onChange={(e) => setUnitPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>


                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='book_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldBook_images && oldBook_images.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {book_imgPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateBook;
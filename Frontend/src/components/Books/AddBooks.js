import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBookAction } from '../../redux/actions/books/bookActions';
import { useNavigate } from "react-router-dom";
import Sidebar from '../admin/Sidebar';
import { fetchAuthors } from '../../redux/actions/author/authorActions';


const AddBook = () => {
    const [book_name, setTitle] = useState('');
    const [publishedDate, setPublished] = useState('');
    const [genres, setGenres] = useState('');
    //
    const [authorName, setAuthor] = useState('');
    //
    const [unitPrice, setUnitPrice] = useState(0);
    const [stock, setStock] = useState('');
    const [book_img, setBookImages] = useState([]);
    const [book_imgPreview, setImagesPreview] = useState([]);

    //Get the user id from store

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo._id);

    // //dispatcher
    const dispatch = useDispatch();
    const history = useNavigate();
    //
    const bookcreated = useSelector((state) => state.bookcreated);
    const { books, error, success } = bookcreated;
    //
    const authorsList = useSelector(state => state.authorsList);
    const { authors } = authorsList;
    useEffect(() => {
        dispatch(fetchAuthors());
        if (error) {
            alert.error(error);
            dispatch();
        }
        if (success) {
            alert("Book created successfully");
            history('/getallbook');
            window.location.reload(false);
            
        }
    }, [dispatch, error, success]);
    //handle form submit
    const handleFromSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("book_name", book_name);
        formData.set("publishedDate", publishedDate);
        formData.set("genres", genres);
        formData.set("author", authorName);
        formData.set("unitPrice", unitPrice);
        formData.set("stock", stock);

        book_img.forEach((image) => {
            formData.append("book_img", image);
        });

        dispatch(createBookAction(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setBookImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);
                    setBookImages((oldArray) => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    return (
        <div className="row mt-5" style={{ "marginTop": "200px" }}>
            <div className="col-12 col-md-2 mt-4">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10 mt-5">
                <div className="wrapper my-5">

                    <form onSubmit={handleFromSubmit} encType="multipart/form-data">
                        <h1 className="mb-4">New Books</h1>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='name_field'>title</label>
                                <input
                                    value={book_name}
                                    onChange={e => setTitle(e.target.value)}
                                    type='text'
                                    id="name_field"
                                    className='form-control'
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

                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Author </label>

                                <select value={authorName} onChange={e => setAuthor(e.target.value)}>

                                    <option >choose authors</option>
                                    {authors &&
                                        authors.map(auth => {
                                            return (
                                                <option value={auth._id} key={auth._id} >{auth.name}</option>
                                            )
                                        })};
                                </select>
                              
                            </div>

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
                                <label htmlFor='exampleInputQuantity'>Stock </label>
                                <input
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    type='number'
                                    className='form-control'
                                    id='exampleInputQuantity'
                                    aria-describedby='emailHelp'
                                    placeholder='Stock'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='formFileMultiple' className="form-label mt-4"> Book picture </label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="product_images"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                    >
                                        Choose Images
                                    </label>
                                </div>

                                {book_imgPreview.map((img) => (
                                    <img
                                        src={img}
                                        key={img}
                                        alt="Images Preview"
                                        className="mt-3 mr-2"
                                        width="55"
                                        height="52"
                                    />
                                ))}

                            </div>
                            <button type='submit' className='btn btn-warning m-auto'>
                                Create Book
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddBook;
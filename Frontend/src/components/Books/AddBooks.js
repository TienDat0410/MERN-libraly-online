import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBookAction } from '../../redux/actions/books/bookActions';
import { useNavigate } from "react-router-dom";


const AddBook = () => {
    const [book_name, setTitle] = useState('');
    const [publishedDate, setPublished] = useState('');
    const [genres, setGenres] = useState('');
    const [author, setAuthor] = useState('');
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
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch()
        }
        if (success) {
            alert("Book created successfully");
            history('/getallbook');
        }
    }, [dispatch, error, success]);
    //handle form submit
    const handleFromSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("book_name", book_name);
        formData.set("publishedDate", publishedDate);
        formData.set("genres", genres);
        formData.set("author", author);
        formData.set("unitPrice", unitPrice);
        formData.set("stock", stock);

        book_img.forEach((image) => {
            formData.append("book_img", image);
        });

        dispatch(createBookAction(formData));

        // if (books) {
        //     alert('Created book successfully');
        //     history('/getallbook');
        // } else {
        //     alert('Created book failed');
        // }
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
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModal'
                        data-bs-placement='top'
                        data-bs-title='add Book'>
                        Click to add Book.
                    </button>

                    <div
                        className='modal fade'
                        id='exampleModal'
                        tabIndex='-1'
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='exampleModalLabel'>
                                        Create Book
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"></span>
                                    </button>

                                    {/* <button type="button" class="btn-close" aria-label="Close"></button> */}
                                </div>
                                <div className='modal-body'>
                                    <h1 className='text-center'>Add Book</h1>
                                    <form onSubmit={handleFromSubmit} encType="multipart/form-data">
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

                                            <div className='form-group'>
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
                                <div className='modal-footer'>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
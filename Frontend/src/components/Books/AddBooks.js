import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookAction } from '../../redux/actions/books/bookActions';


const AddBook = () => {
    const [book_name, setTitle] = useState('');
    const [publishedDate, setPublished] = useState('');
    const [genres, setGenres] = useState('');
    const [author, setAuthor] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [book_img, setBook_img] = useState('');

    // //dispatcher
    const dispatch = useDispatch();
    //handle form submit
    const handleFromSubmit = e => {
        e.prevenDefault();

        const data = {
            book_name, 
            publishedDate,
            genres,
            author, 
            unitPrice,
            quantity,
            book_img,
           
        };
        dispatch(createBookAction(data));
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
                                    {/* <form onSubmit={handleFromSubmit}> */}
                                    <form onSubmit={handleFromSubmit}>
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
                                                    rmFileMultiple'
                                                /> */}
                                                 <input
                                                    value={book_img}
                                                    onChange={e => setBook_img(e.target.files)}
                                                    type='text'
                                                    className='form-control'
                                                    id='formFileMultiple'
                                                />
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
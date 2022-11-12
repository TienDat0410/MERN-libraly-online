import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, fetchBook, fetchBooks, updateBook } from '../../redux/actions/books/bookActions';
import { addItemToCallCart } from '../../redux/actions/callcard/callCardAction';
import Loader from "../layout/Loader";
import Moment from 'moment';

import { Carousel } from "react-bootstrap";

const BookDetail = () => {
    const { id } = useParams();
    const history = useNavigate();

    //Get the book details and fill it in the form
    const bookDetails = useSelector((state) => state.bookDetails);
    const { loading, error, book } = bookDetails;

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    //

    useEffect(() => {
        dispatch(fetchBook(id));
        // dispatch(fetchBooks());
        if (loading) {
            window.location.reload(false);
        }
    }, [dispatch, id]);
    //add to call card
    const addToCallCart = () => {
        dispatch(addItemToCallCart(id, quantity));
        alert("Item Added to Call Cart");
        history('/');
        // window.location.reload(false);
    };
    //set quantity
    const increaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber >= book.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };
    //
    const decreaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <section className="prod-details pt-100 mt-5 mb-5">
                        <div className="container" style={{ "marginTop": "200px" }}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="product-details-gallery">
                                        <div className="row g-3">
                                            <div className="col-sm-9">
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    <div
                                                        className="tab-pane fade show active "
                                                        id="v-pills-img1"
                                                        role="tabpanel"
                                                        aria-labelledby="v-pills-img1-tab">
                                                        <div
                                                            className="gallery-big-image shadow-lg"
                                                            style={{ border: "none" }}>

                                                            <div className="gallery-big-image shadow-lg" style={{ border: "none" }}>
                                                                {book.book_img && book.book_img.map(b => (
                                                                    <div key={b.public_id}>
                                                                        <img
                                                                            className="d-block w-100"
                                                                            src={b.url}
                                                                        />
                                                                    </div>
                                                                ))};

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="prod-details-content">

                                        <h3 className="eg-title1 mb-25">{book.book_name}</h3><h4 className="price-title border--bottom2 mb-15">
                                            <span>{book.unitPrice && book.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                        </h4>
                                        <div className="prod-quantity d-flex align-items-center justify-content-start mb-20">
                                            <div className="quantity">
                                                <input
                                                    className="count p-1"
                                                    type="number"
                                                    style={{ "padding": "none" }}
                                                    value={quantity}
                                                    readOnly />
                                                <div
                                                    className="d-flex"
                                                    style={{ flexDirection: "column" }}>
                                                    <button
                                                        onClick={increaseQty}
                                                        className="btn btn-primary btn-sm">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="10"
                                                            height="10"
                                                            fill="currentColor"
                                                            className="bi bi-chevron-up"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={decreaseQty}
                                                        className="btn btn-primary btn-sm">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="10"
                                                            height="10"
                                                            fill="currentColor"
                                                            className="bi bi-chevron-down"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                type="button" class="btn btn-warning"
                                                style={{ "margin-bottom": "50px", "margin-left": "10px" }}
                                                onClick={addToCallCart}
                                                disabled={book.stock === 0}>
                                                <a href="" className="eg-btn md--btn primary--btn">
                                                    Add to Call cart
                                                </a>
                                            </button>
                                        </div>
                                        <ul className="prod-info">
                                            <li>
                                                <span>Stock:</span>
                                                <b
                                                    className={book.stock ? "text-success" : "text-danger"}
                                                >
                                                    {book.stock ? book.stock : "Out of stock"}
                                                </b>
                                            </li>
                                        </ul>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
};

export default BookDetail;
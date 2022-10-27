import React, { Fragment, useEffect } from 'react';
import './Home.css';
import bookpg from '../../assets/img/book.jpg';
// import videoSource from '../../assets/books.mp4';
import videoSources from '../../assets/book.mp4';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Books from '../Books/FetchBook';
import { fetchBooks } from '../../redux/actions/books/bookActions';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading/loading';
import BookHome from '../Books/book';

const Home = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { books, loading, error } = useSelector((state) => state.booksList);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <Fragment>
            <Fragment>
                <div className='Container'>
                    <video autoPlay='autoplay' loop='loop' muted className='Video'>
                        <source src={videoSources} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                    <div className='Content'>
                        <div className='SubContent'>
                            <h1>Book Catolog</h1>
                            <p>Manage your Books with Ease</p>
                            <button type='button' className='btn btn-outline-dark'>
                                <Link to='/register'>Get started</Link>
                            </button>
                            <img src={bookpg} alt='profile' />
                        </div>
                    </div>
                </div>


            </Fragment>
            <Fragment>
                <section id="products" className="container mt-5">
                    <div className="row">
                        <div className="col-6 col-md-9">
                            <div className="row" >
                                <BookHome />
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>

        </Fragment>
    );
};

export default Home;
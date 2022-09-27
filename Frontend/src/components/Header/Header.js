import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const url = "/";
    //   const history = useHistory();
    //   const userLogin = useSelector(state => state.userLogin);
    //   const { userInfo } = userLogin;

    //logout handler

    //   const logoutHandler = () => {
    //     dispatch(logoutUser());
    //     history.push('/');
    //   };
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href={url}>Libraly-online</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className='nav-link' to='/'>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/addbook'>
                                    Add book
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/register'>
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Books
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className='dropdown-item' to='/getallbook'>
                                        getAllBook
                                    </Link></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-sm-2" type="text" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
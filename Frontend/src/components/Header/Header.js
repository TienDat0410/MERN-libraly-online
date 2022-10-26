import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAction } from '../../redux/actions/users/userAction';


const Header = props => {
    const dispatch = useDispatch();
    const url = "/";
    const history = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    //logout handler

    const logoutHandler = () => {
        dispatch(logoutUserAction());
        history({ url }); //useNagate is not reload page ????
        //reload page use javascript
        window.location.reload(false);
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href={url}>Libraly-online</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='nav nav-pills'>
                            <li className='nav-item"'>
                                <a className='nav-link active' href={url}>
                                    Home <span class="visually-hidden">(current)</span>
                                </a>
                            </li>
                            {!userInfo ? (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/login'>
                                            Login
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/register'>
                                            Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                        <div class="dropdown-menu" style="">
                                            <Link className='nav-link' to='/getallbook'>
                                                Books
                                            </Link>
                                            <Link className='nav-link' to='/addbook'>
                                                Add book
                                            </Link>

                                        </div>
                                    </li> */}
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/getallbook'>
                                            Books
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/addbook'>
                                            Add book
                                        </Link>
                                    </li>

                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/profile'>
                                            Users
                                        </Link>
                                    </li>

                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/profile'>
                                            Profile
                                        </Link>
                                    </li>

                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/author'>
                                            Authors
                                        </Link>
                                    </li>

                                    <li className='nav-item'>
                                        <Link
                                            onClick={logoutHandler}
                                            className='nav-link'
                                            to='/login'>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            )}
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
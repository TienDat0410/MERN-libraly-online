import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";
import Moment from 'moment';
import { fetchAuthors } from '../../redux/actions/author/authorActions';
import Sidebar from '../admin/Sidebar';

const Authors = () => {
    //Fetch books
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);
    const authorsList = useSelector(state => state.authorsList);
    const { authors, loading } = authorsList;
    // End of fetch authors

    return (
        <div>
            {loading && <Loading />}
            {authors !== undefined && authors.length === 0 ? (
                'No'
            ) : (
                <div className="row mt-5">
                    <div className="col-12 col-md-2 mt-4">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10 mt-5">

                        <h1 className="my-5">All Author</h1>
                        <div className='row'>
                            <div className='col'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Author Name</th>
                                            <th scope='col'>Birthday</th>
                                            <th scope='col'>View author's books</th>
                                            <th scope='col'>Action</th>
                                            <th scope='col'>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {authors &&
                                            authors.map(author => {
                                                return (
                                                    <tr key={author._id}>
                                                        <th scope='row'>{author.name}</th>
                                                        <td>{Moment(author.year).calendar()}</td>

                                                        <td>
                                                            <button
                                                                type="button"
                                                                // onClick={() => handlerDeleteBook(book._id)}
                                                                className="btn btn-danger"
                                                                style={{ color: 'white', cursor: 'pointer' }}>Delete</button>
                                                        </td>
                                                        <td>
                                                            {/* <Link to={`/bookdetail/${book && book._id}`}> */}
                                                            <button
                                                                type='button'
                                                                className='btn btn-success'
                                                                style={{
                                                                    color: 'yellow',
                                                                    cursor: 'pointer',
                                                                }}>Details</button>
                                                            {/* </Link> */}
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Authors;
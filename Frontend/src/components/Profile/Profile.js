import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../../redux/actions/users/userAction';
import './Profile.css';

import ErrorMessage from '../Message/ErrorMessage';



const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const userProfile = useSelector((state) => state.userProfile);

  const { error, loading, users } = userProfile;
  // const user = (state) => state.userProfile;

  // console.log('users', users.usename);

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (<h3>Loading</h3>)
        : (
          <div className='container'>
            <div className='row'>
              <div className='col mt-5'>
                <div className='card m-auto ' style={{ width: '50%' }}>
                  <img src={users && users.avatar.url} className='card-img-top' alt='...' />
                  <div className='card-body'>
                  <h5 className='card-title'>{users && users.username}</h5>
                    <p className='card-text'>{users && users.email}</p>
                    <Link to='/user-update' className='btn btn-success'>
                      Update your profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {loading ? <h1>Loading please wait</h1> :
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Book image</th>
              <th scope='col'>Book Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Delete</th>
              <th scope='col'>Update</th>
            </tr>
          </thead>
          <tbody>
            {users && users.books.map(book => (
              <tr className='table-secondary'>
                <th scope='row' key={book.book_img.public_id}><img style={{height: "350px"} } src={book.book_img.url}></img></th>
                <td>{book.book_name}</td>
                <td>{book.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
            ))}
          </tbody>
        </table>}
      {/* Table */}

    </>
  );
};

export default Profile;
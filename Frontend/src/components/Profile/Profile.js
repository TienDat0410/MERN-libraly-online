import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../../redux/actions/users/userAction';
import Loader from '../layout/Loader';



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
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>

                <h2 className="mt-5 ml-5">My Profile</h2>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3">
                        <figure className='avatar avatar-profile'>
                            <img className="rounded-circle img-fluid" src={users && users.avatar.url} alt={users && users.username}
                            style={{"border": "2px solid #df7017"}} />
                        </figure>
                        <Link to='/user-update' id="edit_profile" className="btn btn-primary btn-block my-5">
                            Edit Profile
                        </Link>
                    </div>

                    <div className="col-12 col-md-5">
                        <h4>Full Name</h4>
                        <p>{users && users.username}</p>

                        <h4>Email Address</h4>
                        <p>{users && users.email}</p>
                      

                        {users && users.permission !== 'admin' && (
                            <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                My Orders
                            </Link>
                        )}

                        <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                            Change Password
                        </Link>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
)
}

export default Profile;
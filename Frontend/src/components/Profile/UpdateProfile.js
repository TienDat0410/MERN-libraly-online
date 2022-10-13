import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/users/userAction";


const UpdateProfile = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    // console.log(userInfo && userInfo.username);
    const [username, setusername] = useState(userInfo && userInfo.username);
    const [password, setpassword] = useState('');
    const [email, setemail] = useState(userInfo && userInfo.email);
    //
    const updatedUser = useSelector((state) => state.updatedUser);
    const { user, loading, success, error } = updatedUser;


    //dispatch
    const handleFormSubmit = e => {
        e.preventDefault();

        dispatch(updateUser(username, password, email));
        if(updateUser){
            alert('Update Successfully');
        } else {
            alert('Update failed');
        }
        
        // console.log('Submitted');
    };


    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {error && <h1>{error}</h1>}
                    {loading && <h1>Loading</h1>}
                    <h1 className="text-center">Update</h1>
                    <form onSubmit={handleFormSubmit}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPassword1'>UserName</label>
                                <input
                                    value={username}
                                    onChange={e => setusername(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='username'
                                />
                            </div>

                            <div className="form-group">
                                <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                                <input
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
                                <input
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email" />
                            </div>

                            <button type='submit' className='btn btn-warning m-auto'>
                                Update Your Profile
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    )
};

export default UpdateProfile;
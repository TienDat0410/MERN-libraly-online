import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { registerUserAction } from '../../redux/actions/users/userAction';
import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";


const RegisterUser = () => {

    const [username, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    // const [permission, setpermission] = useState('');
    const permission = 'user';

    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    //submit
    const formSubmitHandler = e => {
        e.preventDefault();
        dispatch(registerUserAction(username, password, email, permission));
        console.log(userInfo, loading, error);
        if (userInfo) {
            history('/');
            window.location.reload(false);
        }
    };

    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {loading && <Loading />}
                    <h1 className='text-center'>Register</h1>

                    <form onSubmit={formSubmitHandler}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Name</label>
                                <input
                                    value={username}
                                    onChange={e => setname(e.target.value)}
                                    type='text'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter Name'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Email address</label>
                                <input
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                    type='email'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPassword1'>Password</label>
                                <input
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    type='password'
                                    className='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='Password'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPermission'>Permission</label>
                                {/* <select className="form-select" id="exampleInputPermission" value={permission} onChange={e => setpermission(e.target.value)}>
                                    <option>admin</option>
                                    <option>user</option>

                                </select> */}
                                {/* <input
                                    value='user'
                                    type='text'
                                    className='form-control'
                                    id='exampleInputPermission'
                                    placeholder='Permission'
                                /> */}
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Register
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default RegisterUser;
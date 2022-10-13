import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { registerUserAction } from '../../redux/actions/users/userAction';
import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";
import { updateUserFile } from '../../redux/actions/users/userAction';
import axios from "axios";

const RegisterUser = () => {

    const [username, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    // const [permission, setpermission] = useState('');
    const permission = 'user';
    const [file, setFile] = useState(null);

    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    //submit
    const formSubmitHandler = async(e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            email,
          };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newUser.userPic = filename;
            console.log(e.target.files);
            try {
                // dispatch(updateUserFile(data));
                await axios.post("/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        // dispatch(registerUserAction(username, password, email, permission));
        dispatch(registerUserAction(newUser));
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
                    {file && (
                        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
                    )}

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
                            <div className='form-group'>
                                <label htmlFor='formFile' className="form-label mt-4">Choose your image</label>
                                <input
                                    value={file}
                                    onChange={e => setFile(e.target.files[0])}                                   
                                    type='file'
                                    className='form-control'
                                    id='formFile'
                                    placeholder='choose file'
                                />
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
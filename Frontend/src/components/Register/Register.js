import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { registerUserAction } from '../../redux/actions/users/userAction';
import Loading from '../Loading/loading';
import { useNavigate, Link } from "react-router-dom";


const RegisterUser = () => {

    // const [user, setUser] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    // });
    const [username, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');

    // const { username, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "https://res.cloudinary.com/dml8obswa/image/upload/v1665707345/avatars/lvqt3d9m7riaxxq1t50b.png"
    );

    //
    const history = useNavigate();
    // const alert = useAlert();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history("/");
        }

        if (error) {
            alert(error);
        }
    }, [dispatch, alert, userInfo, error]);


    //submit
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("username", username);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);
        // formData.append('avatar', avatar);

        // dispatch(registerUserAction(username, password, email, permission));
        dispatch(registerUserAction(formData));
        console.log(userInfo, loading, error);
        if (userInfo) {
            alert('Register success');
            history('/');
            window.location.reload(false);
        }
    };

    const onchange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        // } else {
        //     setUser({ ...user, [e.target.name]: e.target.value });
        // }
    };

    return (
        <Fragment>

            <div className='row container-height' style={{"marginTop": "200px"}}>
                <div className='col-lg-6 col-md-6 m-auto'>
                    <div className='container'>
                        {loading && <Loading />}
                        <h1 className='text-center'>Register</h1>

                        <form onSubmit={submitHandler} encType="multipart/form-data">
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
                                <div className="form-group">
                                    <label htmlFor="avatar_upload">Avatar</label>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <figure className="avatar mr-3 item-rtl">
                                                <img
                                                    src={avatarPreview}
                                                    className="rounded-pill"
                                                    alt="Avatar Preview"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </figure>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                name="avatar"
                                                className="custom-file-input"
                                                id="customFile"
                                                onChange={onchange}
                                            />
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary' style={{'margin-left': '200px'}}>
                                    Register
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RegisterUser;
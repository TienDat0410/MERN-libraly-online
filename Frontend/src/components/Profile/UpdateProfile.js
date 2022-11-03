import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/users/userAction";
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {

    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    //
    const userProfile = useSelector((state) => state.userProfile);
    const { users } = userProfile;
    const dispatch = useDispatch();
    // console.log(userInfo && userInfo.username);
    const [username, setusername] = useState(users && users.username);
    const [password, setpassword] = useState('');
    const [email, setemail] = useState(users && users.email);
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/dml8obswa/image/upload/v1665707345/avatars/lvqt3d9m7riaxxq1t50b.png');
    //
    const updatedUser = useSelector((state) => state.updatedUser);
    const { error, isUpdated, loading } = updatedUser;
    //
    useEffect(() => {

        if (users) {
            setusername(users.username);
            setemail(users.email);
            setAvatarPreview(users.avatar.url)
        }

        if (error) {
            alert(error);
        }

        if (isUpdated) {
            alert('User updated successfully');
            history('/profile');
        }

    }, [alert, error, history, isUpdated])

    //dispatch
    const handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('username', username);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateUser(formData));
    };

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <div className='row container-height' style={{"marginTop": "200px"}}>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {error && <h1>{error}</h1>}
                    {loading && <h1>Loading</h1>}
                    <h1 className="text-center">Update</h1>
                    <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
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

                            {/* <div className="form-group">
                                <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                                <input
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password" />
                            </div> */}

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

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                                
                                              
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../../../redux/features/auth/authSlice';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = () => {
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const status = useSelector(state => state.auth.status);
    const dispatch = useDispatch();
    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if(status) toast(status);
        if(isAuth) navigate("/");
    }, [status, isAuth, navigate])

    // useEffect(() => {
    //     dispatch(registerUser(name, password))
    // }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(registerUser({ name, password }))
            setName('');
            setPassword('');
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="login__page">
            <div className="login__wrapper">
                <h1 className='login__title'>Registration Form</h1>
                <form onSubmit={(e) => onSubmit(e)} className="login__form form-login">
                    <label htmlFor="name" className="form-login__label">
                        <span>Enter your name</span>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            name="name" 
                            id="name" 
                            className="form-login__input" />
                    </label>
                    <label htmlFor="password" className="form-login__label">
                        <span>Enter password</span> 
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            name="password" 
                            id="password" 
                            className="form-login__input" />
                    </label>
                    <div className="form-login__btns">
                        <button type='submit' className="login__submit">Submit</button>
                        <Link to={"/login"} className="form-login__link">Already register?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
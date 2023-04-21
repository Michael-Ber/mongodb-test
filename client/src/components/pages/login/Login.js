import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkIsAuth } from '../../../redux/features/auth/authSlice';
import {toast} from "react-toastify";
import './login.scss';

const Login = () => {
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const dispatch = useDispatch();
    const status = useSelector(state => state.auth.status);
    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if(status) toast(status);
        if(isAuth) navigate("/");
    }, [status, navigate, isAuth])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({name, password}));
        setName('');
        setPassword('');
    }



    return (
        <div className="login__page">
            <div className="login__wrapper">
                <h1 className='login__title'>Sign in Form</h1>
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
                        <button type='submit' className="login__submit">Sign in</button>
                        <Link to={"/registration"} className="form-login__link">Do not have account yet?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
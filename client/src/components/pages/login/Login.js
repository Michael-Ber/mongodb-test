import { useState, useEffect } from 'react';
import './login.scss';

const Login = () => {
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [newUser, setNewUser] = useState(); 

    useEffect(() => {
        console.log(newUser);
    }, [newUser])

    const onSubmit = async(e) => {
        e.preventDefault();
        const user = {name, password};
        const response = await fetch("http://localhost:3002/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(res => setNewUser(res))
        .finally(() => {setName(''); setPassword('')})
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
                            type="text" 
                            name="password" 
                            id="password" 
                            className="form-login__input" />
                    </label>
                    <button type='submit' className="login__submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
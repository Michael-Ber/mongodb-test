import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import {toast} from 'react-toastify'
import './header.scss';

const Header = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        navigate("/");
        toast("You are logout")
    }

    const activeStyles = {
        color: "#fff"
    }

    return (
        <header className="header">
            
            <div className="header__wrapper">
                <div className="header__logo header-element">
                    <Link 
                        to={"/"}
                        className="header__link">
                            Logo
                    </Link>                    
                </div>
                {isAuth && <div className="header__pages">
                    <div className="header__logo header-element">
                        <NavLink 
                            to={"/"}
                            style={({isActive}) => isActive ? activeStyles : null} 
                            className="header__link">
                                Main
                        </NavLink>                    
                    </div>
                    <div className="header__about header-element">
                        <NavLink 
                            to={"/myPosts"} 
                            style={({isActive}) => isActive ? activeStyles : null} 
                            className="header__link">
                                My Posts
                        </NavLink>
                    </div>
                    <div className="header__contacts header-element">
                        <NavLink 
                            to={"/newPost"} 
                            style={({isActive}) => isActive ? activeStyles : null} 
                            className="header__link">
                                Add post
                        </NavLink>
                    </div>
                </div>}
                <div className="header__subwrapper">
                    <div className="header__login header-element">
                        {
                        isAuth ? 
                        <button onClick={handleLogout} className="header-element__btn">Sign out</button> : 
                        <Link 
                            to={"/login"} 
                            className="header__link">
                                Sign in
                        </Link>
                        }
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;
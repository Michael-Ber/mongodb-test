import { Link } from "react-router-dom";
import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__pages">
                    <div className="header__logo header-element">
                        <Link to={"/"} className="header__link">Logo</Link>                    
                    </div>
                    <div className="header__about header-element">
                        <Link to={"/about"} className="header__link">About</Link>
                    </div>
                    <div className="header__contacts header-element">
                        <Link to={"/contacts"} className="header__link">Contacts</Link>
                    </div>
                </div>
                <div className="header__subwrapper">
                    <div className="header__login header-element">
                        <Link to={"/login"} className="header__link">Sign in</Link>
                    </div>
                    <div className="header__reg header-element">
                        <Link to={"/registration"} className="header__link">Register</Link>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;
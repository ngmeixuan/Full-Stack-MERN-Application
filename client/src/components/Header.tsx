import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

function Header() {
    return (
        <header>
            <Link to="/user/list" className="logo">
                <img src={logo} alt="ReactJs" /> User App
            </Link>

            <nav>
                <NavLink to="/user/list">Home</NavLink>
            </nav>
        </header>
    );
}

export default Header;
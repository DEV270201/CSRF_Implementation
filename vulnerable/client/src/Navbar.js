import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="navigation">
                    <NavLink to="/">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar;
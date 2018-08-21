import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = props => (
    <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="navbar-wrapper">
            <Link to="/">
                <span className="navbar-brand">Tappy</span>
            </Link>
            {/* <Link to={props.route}> */}
                <span className="navbar-text navbar-item-right">
                    {props.val}
                </span>
            {/* </Link> */}
        </div>
    </nav>
);

export default Navbar;

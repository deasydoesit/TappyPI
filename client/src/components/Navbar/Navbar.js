import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = props => (
    <nav className="navbar navbar-dark bg-dark fixed-top">
        <Link to="/">
            <a className="navbar-brand" href="#">Tappy</a>
        </Link>
        <Link to={props.route}>
            <span className="navbar-text">
                {props.val}
            </span>
        </Link>
    </nav>
);

export default Navbar;

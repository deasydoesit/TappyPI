import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import tappy_header from "../../images/tappy_header.png";

const Navbar = props => (
    <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="navbar-wrapper">
            <Link to="/">
                <img src={tappy_header} className="navbar-brand navbar-img" />
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

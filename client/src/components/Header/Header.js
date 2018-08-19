import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="logo">
                <Link to="/">
                <img src={"#"} alt="Tappy logo"/>
                </Link>
                <h1>Tappy</h1>
            </div>
        );
    }
}
export default Header;

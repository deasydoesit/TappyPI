import React, { Component } from "react";
import "./Checkout.css";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          order: []
        };
    }

    render() {
        return (
        <Container fluid>

            <Navbar
                route={"/Sales"}
                val={"Sales"}
            />

            <Jumbotron />

            <Footer />

        </Container>
        );
    }
}

export default Checkout;
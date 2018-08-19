import React, { Component } from "react";
import "./Chekcout.css";
import Container from "../../components/Container";
import Header from "../../components/Header";
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

            <Header />

            <Jumbotron />

            <Footer />

        </Container>
        );
    }
}

export default Checkout;
import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Jumbotron from "../../components/Jumbotron";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import "./Checkout.css";

const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'qty',
    text: 'Product Quantity',
    validator: (newValue, row, column) => {
      if (isNaN(newValue)) {
        return {
          valid: false,
          message: 'Quantity should be numeric'
        };
      }
      if (newValue < 0) {
        return {
          valid: false,
          message: 'Price should be an integer'
        };
      }
      return true;
    }
  }, {
    dataField: 'price',
    text: 'Product Price',
    validator: (newValue, row, column) => {
      if (isNaN(newValue)) {
        return {
          valid: false,
          message: 'Price should be numeric'
        };
      }
      if (newValue < 0) {
        return {
          valid: false,
          message: 'Price should greater than 0'
        };
      }
      return true;
    }
}];

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          item: "",
          qty: "",
          price: ""
        };
    }

    handleChange = event => {
        if (event.target.name === "item") {
          this.setState({ item: event.target.value });
        } 
        if (event.target.name === "qty") {
          this.setState({ qty: event.target.value });
        }
        if (event.target.name === "price") {
          this.setState({ price: event.target.value });
        }
    };
    
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ item: event.target.value, qty: event.target.value, price: event.target.price })
        let item = {
            item: this.state.item,
            qty: this.state.qty,
            price: this.state.price
        }
        this.setState({ item: "", qty: "", price: "" });
    };
    

    render() {
        return (
        <Container fluid>

            <Navbar
                route={"/Sales"}
                val={"Sales"}
            />

            <Jumbotron>

                <Form />

                <BootstrapTable
                  keyField="id"
                  data={ [] }
                  columns={ columns }
                  cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true
                  }) }
                  noDataIndication="Table is Empty"
                />

            </Jumbotron>

            <Footer />

        </Container>
        );
    }
}

export default Checkout;
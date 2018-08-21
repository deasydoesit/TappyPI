import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import QRCode from 'qrcode.react';
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
    dataField: 'item',
    text: 'Product Name',
    validator: (newValue, row, column) => {
        if (!isNaN(newValue)) {
          return {
            valid: false,
            message: 'Produce name should be a string'
          };
        }
        return true;
      }
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
  }, {
    dataField: 'totPrice',
    text: 'Total Price'
  }
];

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          id: "",
          item: "",
          qty: "",
          price: "",
          qrVal: 0
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
        let totPrice = this.state.qty * this.state.price;
        let val = this.state.qrVal;
        val += totPrice;
        this.setState({qrVal: val});
        console.log(this.state.qrVal);
        let item = {
            id: this.state.items.length,
            item: this.state.item,
            qty: this.state.qty,
            price: this.state.price,
            totPrice: totPrice
        };
        let holder = this.state.items;
        holder.push(item);
        this.setState({items: holder});
        this.setState({ id: "", item: "", qty: "", price: "" });
    };
    

    render() {
        return (
        <Container fluid>

            <Navbar
              route={"/Sales"}
              val={"Sales"}
            />
            <div className="container-special">
              <div className="row">
                <div className="col-md-4">
                  <Form 
                    item={ this.state.item }
                    qty={ this.state.qty }
                    price={ this.state.price }
                    handleSubmit={ this.handleSubmit }
                    handleChange={ this.handleChange }
                  />
                  {this.state.qrVal === 0 ? (null) : (
                  <div className="row qr-container">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                      <QRCode 
                        value={this.state.qrVal.toString()}
                        size={200}
                      />
                      <h3>Total: {this.state.qrVal.toString()}</h3>
                    </div>
                  </div>
                  )} 
                </div>
                <div className="col-md-8">
                  <h3>Receipt</h3>
                  <BootstrapTable
                    keyField="id"
                    data={ this.state.items }
                    columns={ columns }
                    noDataIndication="No Items Have Been Added"
                  /> 
                </div>
              </div>
            </div>
            <Footer />

        </Container>
        );
    }
}

export default Checkout;
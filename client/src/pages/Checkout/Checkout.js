import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import QRCode from 'qrcode.react';
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import "./Checkout.css";

const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'item',
    text: 'Product Name',
  }, {
    dataField: 'qty',
    text: 'Product Quantity',
  }, {
    dataField: 'price',
    text: 'Product Price',
  }, {
    dataField: 'totCost',
    text: 'Cost'
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

        if (!this.state.item || !this.state.qty || !this.state.price) {
          return;
        }

        let totCost = this.state.qty * this.state.price;
        let val = this.state.qrVal;
        val += totCost;
        this.setState({qrVal: val});

        let item = {
            id: this.state.items.length,
            item: this.state.item,
            qty: this.state.qty,
            price: this.state.price,
            totCost: totCost.toFixed(2)
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
                        value={this.state.qrVal.toFixed(2)}
                        size={250}
                      />
                      <h3>Total: {this.state.qrVal.toFixed(2)}</h3>
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
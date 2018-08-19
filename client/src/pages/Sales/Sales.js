import React, { Component } from "react";
import { Redirect } from "react-router";
import { List, ListItem } from "../../components/List";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import "./Sales.css";

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sales: []
        };
    }

    componentDidMount = () => {
        this.loadSales();
    }

    loadSales = () => {
        API.getSales()
          .then(res => {
            this.setState({ sales: res.data });
          })
          .catch(err => console.log(err));
    }

    render() {
        return (
        <div className="salesPage">
            
            <Navbar 
                route={"/"}
                val={"Checkout"}
            />

            {this.state.sales.length ? (
            <List>
                {this.state.sales.map(tree => (
                <ListItem key={tree._id}>
                    <div className="row">
                        <div className="col-md-3">
                        <i>
                            <strong>{tree.name}</strong>
                            <p>{tree.sciName}</p>
                        </i>
                        </div>
                        <div className="col-md-3">
                        <img src={tree.path} />
                        </div>
                        <div className="col-md-3">
                        <img src={tree.range} />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </ListItem>
            ))}
            </List>
            ) : (
            <h1>No Sales</h1>
            )}

            <Footer />
            
        </div>
        );
    }
}


export default Sales;
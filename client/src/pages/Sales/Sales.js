import React, { Component } from "react";
import { List, ListItem } from "../../components/List";
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
        API.getSales()
            .then(res => {
                console.log(res);
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
                {this.state.sales.map(sale => (
                <ListItem key={sale._id}>
                    <div className="row">
                        <div className="col-md-3">
                        <i>
                            <strong>{sale.name}</strong>
                            <p>{sale.sciName}</p>
                        </i>
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
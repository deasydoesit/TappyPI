import React from "react";
import "./Form.css";

const Form = props => (
    <form onSubmit={props.handleSubmit}>
        <h3>Add New Item</h3>
        <label>
            Item:
                <input
                    type="text"
                    name="item"
                    value={props.item}
                    onChange={props.handleChange}
                />
        </label>
        <label>
            Qty:
                <input
                    type="text"
                    name="qty"
                    value={props.qty}
                    onChange={props.handleChange}
                />
        </label>
        <label>
            Price:
                <input
                    type="text"
                    name="price"
                    value={props.price}
                    onChange={props.handleChange}
                />
            </label>
        <input type="submit" value="Add" />
    </form>
);

export default Form;
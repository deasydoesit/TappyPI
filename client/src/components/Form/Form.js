import React from "react";
import "./Form.css";

const Form = props => (
    <form onSubmit={(e) => props.handleSubmit(e)}>
        <h3>Add New Item</h3>
        <label>
            Item:
                <input
                    type="text"
                    name="item"
                    value={props.item}
                    onChange={(e) => props.handleChange(e)}
                />
        </label>
        <label>
            Qty:
                <input
                    type="text"
                    name="qty"
                    value={props.qty}
                    onChange={(e) => props.handleChange(e)}
                />
        </label>
        <label>
            Price:
                <input
                    type="text"
                    name="price"
                    value={props.price}
                    onChange={(e) => props.handleChange(e)}
                />
        </label>
        <input type="submit"  />
    </form>
);

export default Form;
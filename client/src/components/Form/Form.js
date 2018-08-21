import React from "react";
import "./Form.css";

const Form = props => (
    <div className="form-container">
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h3>Add New Item</h3>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Item</label>
                <input className="form-control col-sm-10"
                    type="text"
                    name="item"
                    value={props.item}
                    onChange={(e) => props.handleChange(e)}
                />
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Qty</label>
                <input className="form-control col-sm-10"
                    type="text"
                    name="qty"
                    value={props.qty}
                    onChange={(e) => props.handleChange(e)}
                />
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Price</label>
                <input className="form-control col-sm-10"
                    type="text"
                    name="price"
                    value={props.price}
                    onChange={(e) => props.handleChange(e)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Item!</button>
        </form>
    </div>
);

export default Form;
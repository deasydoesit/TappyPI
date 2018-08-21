import React from "react";
import "./Container.css"

const Container = ({ children }) => (
  <div className="container-fluid manage-padding">
    {children}
  </div>
);

export default Container;
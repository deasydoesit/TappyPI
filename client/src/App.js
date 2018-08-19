import React from "react";
import Sales from "./pages/Sales";
import Checkout from "./pages/Checkout";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Checkout } />
        <Route exact path="/Sales" component={ Sales } />
      </Switch>
    </div>
  </Router>
);

export default App;

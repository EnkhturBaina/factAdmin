import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios-orders";

class App extends Component {
  state = {
    storedData: [],
  };
  componentDidMount() {
    axios.get("/categories.json").then((response) => {
      const arr = Object.entries(response.data);
      this.setState({ storedData: arr });
    });
  }

  render() {
    console.log("thissss", this.state.storedData);
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/">Нүүр</Link>
          <Link
            to={{
              pathname: "/addcategory",
              query: { storedData: this.state.storedData },
            }}
          >
            Categ
          </Link>
          <Route path="/" exact component={Home}></Route>
          <Route path="/addcategory" component={AddCategory}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

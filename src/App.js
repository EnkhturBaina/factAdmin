import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import Facts from "./pages/Facts";
import SearchPage from "./pages/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios-orders";
class App extends Component {
  state = {
    storedFacts: [],
    storedCats: [],
    saaaa: true,
  };
  componentDidMount() {
    // this.getCatData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      // this.getCatData();
    }
  }
  aaa = () => {
    this.setState({ saaaa: false });
  };
  render() {
    console.log("App state", this.state);
    return (
      <BrowserRouter>
        <div className="App" style={{ display: "flex" }}>
          <ul className="sidebar-ul">
            <li>
              <Link to="/search">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            <li>
              <Link to="/">Нүүр</Link>
            </li>
            <li>
              <Link to="/addcategory" cat={this.state.storedCats}>
                Ангилал
              </Link>
            </li>
            <li>
              <Link to="/facts">Факт</Link>
            </li>
          </ul>
          <div style={{ flex: 1, padding: "50px" }}>
            <Route path="/" exact component={Home}></Route>
            <Route path="/addcategory" component={AddCategory}></Route>
            <Route path="/search" component={SearchPage}></Route>
            <Route path="/facts" component={Facts}></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

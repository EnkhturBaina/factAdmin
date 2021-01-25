import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../axios-orders";

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      storedFacts: [],
      searchField: "",
    };
  }
  componentDidMount() {
    axios.get("/facts.json").then((response) => {
      if (response.data != null) {
        const arr = Object.entries(response.data);
        this.setState({ storedFacts: arr });
      }
    });
  }
  onSearchChanged = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { storedFacts, searchField } = this.state;

    const filteredcourse = storedFacts.filter((el) => el[1].title.toLowerCase().includes(searchField));
    return (
      <div>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Хайх" aria-label="Search" aria-describedby="basic-addon1" onChange={this.onSearchChanged} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <div className="card-container">
                {filteredcourse.map((course, index) => (
                  <div className="filtered-result" key={index}>
                    <span> {course[1].title} </span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

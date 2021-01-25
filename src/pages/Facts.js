import React, { Component } from "react";
import "../css/addCategory.css";
import { database } from "../firebase/Firebase";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import axios from "../axios-orders";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

class Facts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      storedFacts: [],
      storedCats: [],
      isLoading: false,
    };
    this.changeCat = this.changeCat.bind(this);
    this.titleChange = this.titleChange.bind(this);
  }

  componentDidMount() {
    this.getCatData();
  }

  getCatData = () => {
    axios.get("/categories.json").then((response) => {
      if (response.data != null) {
        const arr = Object.entries(response.data);
        this.setState({ storedCats: arr });
      }
    });
    axios.get("/facts.json").then((response) => {
      if (response.data != null) {
        const arr = Object.entries(response.data);
        this.setState({ storedFacts: arr, isLoading: true });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.getCatData();
    }
    // this.getCatData();
  }

  changeCat = (e) => {
    this.setState({ category: e.target.value });
  };
  titleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  addFact = () => {
    const categoryData = {
      category: this.state.category,
      title: this.state.title,
    };

    axios.post("/facts.json", categoryData).then((response) => {});
  };

  rmFact = (ss) => {
    database.ref("facts/").child(ss).remove();
  };
  handleClose = (action) => {
    this.setState({ [action]: false });
  };

  handleShow = (action, index) => {
    this.setState({ [action]: true });
  };
  render() {
    console.log("this.state.storedFacts", this.state.storedFacts);
    return (
      <div>
        {this.state.isLoading && (
          <Container>
            <Row>
              <Col style={{ textAlign: "left", margin: "5px", paddingLeft: "0px" }}>
                <Button variant="primary" onClick={() => this.handleShow("addModelShow")}>
                  Нэмэх
                </Button>
                <Modal show={this.state.addModelShow} onHide={() => this.handleClose("addModelShow")}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ангилал нэмэх</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Ангилал</Form.Label>
                        <Form.Control as="select" onChange={this.changeCat.bind(this)}>
                          <option>Сонгох</option>
                          {this.state.storedCats.map((cat, index) => (
                            <option key={index} value={cat[1].title}>
                              {cat[1].title}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formGroupTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" value={this.state.title} onChange={this.titleChange} />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose("addModelShow")}>
                      Хаах
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.handleClose("addModelShow");
                        this.addFact();
                      }}
                    >
                      Хадгалах
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
            <Row>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>*</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.storedFacts.map((facts, index) => {
                    return (
                      <tr className="form__table-row" key={index}>
                        <td>{index + 1}</td>
                        <td>{facts[1].category}</td>
                        <td>{facts[1].title}</td>
                        <td>
                          <Button variant="warning" onClick={() => this.handleShow("editModelShow", index)}>
                            Засах
                          </Button>
                          <Modal show={this.state.editModelShow} onHide={() => this.handleClose("editModelShow")}>
                            <Modal.Header closeButton>
                              <Modal.Title>Ангилал засах</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group controlId="formGroupTitle">
                                  <Form.Label>Title</Form.Label>
                                  <Form.Control type="text" placeholder="Title" value={this.state.title} onChange={this.titleChange} />
                                </Form.Group>
                                <Form.Group controlId="formGroupImg">
                                  <Form.File id="exampleFormControlFile1" label="Зураг" onChange={this.handleChange} />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => this.handleClose("editModelShow")}>
                                Хаах
                              </Button>
                              <Button variant="primary" onClick={this.addCat}>
                                Хадгалах
                              </Button>
                            </Modal.Footer>
                          </Modal>{" "}
                          <Button variant="danger" onClick={() => this.rmCat(facts[0])}>
                            Устгах
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Container>
        )}
        {!this.state.isLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}

export default Facts;

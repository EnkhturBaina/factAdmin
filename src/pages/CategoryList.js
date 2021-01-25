import React, { Component } from "react";
import "../css/addCategory.css";
import { storage } from "../firebase/Firebase";
import { database } from "../firebase/Firebase";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import axios from "../axios-orders";
import Form from "react-bootstrap/Form";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      imageURL: "",
      storedData: [],
      addModelShow: false,
      editModelShow: 0,
    };
    this.titleChange = this.titleChange.bind(this);
  }

  componentDidMount() {
    // this.getCatData();
  }

  getCatData = () => {
    axios.get("/categories.json").then((response) => {
      const arr = Object.entries(response.data);
      this.setState({ storedData: arr });
      console.log(this.state.storedData);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.getCatData();
    }
  }

  uploadImage = (e) => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  titleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  addCat = () => {
    //category нэмэх
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then((url) => {
            setTimeout(() => {
              this.setState({ imageURL: url }, function () {
                const categoryData = {
                  title: this.state.title,
                  imageURL: this.state.imageURL,
                };

                axios.post("/categories.json", categoryData).then((response) => {});
              });
            }, 10);
          });
      }
    );
    this.setState({ modelShow: false });
  };

  rmCat = (ss) => {
    database.ref("categories/").child(ss).remove();
  };

  modalClose = (modal) => {
    this.setState({ [modal]: 0 });
  };

  modalShow = (modal, e) => {
    this.setState({ [modal]: e });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => this.modalShow("addModelShow", 1)}>
                Нэмэх
              </Button>
              <Modal show={this.state.addModelShow === 1} onHide={() => this.modalClose("addModelShow")}>
                <Modal.Header closeButton>
                  <Modal.Title>Ангилал нэмэх</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formGroupTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Title" value={this.state.title} onChange={this.titleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGroupImg">
                      <Form.File id="exampleFormControlFile1" label="Зураг" onChange={this.uploadImage} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.modalClose("addModelShow")}>
                    Хаах
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.modalClose("addModelShow");
                      this.addCat();
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
                  <th>Title</th>
                  <th>Img</th>
                  <th>*</th>
                </tr>
              </thead>
              <tbody>
                {this.state.storedData.map((aa, index) => {
                  return (
                    <tr className="form__table-row" key={index}>
                      <td>{index + 1}</td>
                      <td>{aa[1].title}</td>
                      <td>
                        <Image className="category-img" src={aa[1].imageURL} />
                      </td>
                      <td>
                        <Button variant="warning" onClick={() => this.modalShow("editModelShow", index + 1)}>
                          Засах
                        </Button>
                        <Modal show={this.state.editModelShow === index + 1} onHide={() => this.modalClose("editModelShow")}>
                          <Modal.Header closeButton>
                            <Modal.Title>Ангилал засах</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group controlId="formGroupTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" value={aa[1].title} onChange={this.titleChange} />
                              </Form.Group>
                              <Form.Group controlId="formGroupImg">
                                <Form.File id="exampleFormControlFile1" label="Зураг" onChange={this.handleChange} />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.modalClose("editModelShow")}>
                              Хаах
                            </Button>
                            <Button variant="primary" onClick={this.addCat}>
                              Хадгалах
                            </Button>
                          </Modal.Footer>
                        </Modal>{" "}
                        <Button variant="danger" onClick={() => this.rmCat(aa[0])}>
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
      </div>
    );
  }
}

export default AddCategory;

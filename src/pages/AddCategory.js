import React, { Component } from "react";
// import axios from "axios";
import "../css/addCategory.css";
import { storage } from "../firebase/Firebase";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
// import ModalTitle from "react-bootstrap/ModalTitle";
import axios from "../axios-orders";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "First",
      image: "",
      imageURL: "",
      storedData: [],
      modelShow: false,
    };
  }

  // componentDidMount() {
  //   axios.get("/categories.json").then((response) => {
  //     const arr = Object.entries(response.data);

  //     console.log("arr", arr);
  //     arr.forEach((el) => {
  //       console.log("el", el);
  //     });
  //     console.log("res", response);
  //     this.setState({ storedData: arr });
  //   });
  // }
  componentDidMount() {
    console.log("this.props", this.props);
  }
  componentDidUpdate() {}

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  addCat = () => {
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
            console.log("url", url);
            setTimeout(() => {
              this.setState({ imageURL: url }, function () {
                const categoryData = {
                  title: this.state.title,
                  imageURL: this.state.imageURL,
                };

                axios.post("/categories.json", categoryData).then((response) => {
                  console.log("res", response);
                });
              });
            }, 10);
          });
      }
    );
    this.setState({ modelShow: false });
  };
  handleClose = () => {
    this.setState({ modelShow: false });
  };
  handleShow = () => {
    this.setState({ modelShow: true });
  };
  render() {
    const { yourData } = this.props.location;
    // console.log("yourData", yourData);
    console.log("this.state.storedData", this.state.storedData);
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={this.handleShow}>
                Primary
              </Button>
              <Modal show={this.state.modelShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="text" />
                  <input type="file" onChange={this.handleChange} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.addCat}>
                    Save Changes
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
              <tbody>{/* {this.state.storedData.map((aa, index) => {
                  return (
                    <tr className="form__table-row">
                      <td>{index + 1}</td>
                      <td>{aa[1].title}</td>
                      <td>
                        <Image src={aa[1].imageURL} />
                      </td>
                      <td>
                        <Button variant="warning">Edit</Button> <Button variant="danger">Remove</Button>
                      </td>
                    </tr>
                  );
                })} */}</tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddCategory;

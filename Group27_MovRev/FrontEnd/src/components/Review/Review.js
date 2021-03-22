import "./Review.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
// import Image from 'react-bootstrap/Image'
// import batman from "../../assets/batman.jpeg";
import defaultPoster from '../../assets/default_poster.png';

class Review extends Component {
  constructor(props) {
    super();
    this.state = {
      movieId: props.match.params.movieId,
      poster: props.location.poster,
      title: props.location.title,
      year: props.location.year
    }
  }
  handleOnSubmit() {
    alert("Thanks for your input! :)");
  };
  render() {
    const state = this.state;
    if (state.Poster === "N/A") {
      state.Poster = defaultPoster;
    }
    return (
      <div className="container-fluid">
        <h1>
          Add a review{" "}
          <span role="img" aria-label="popcorn">
            🍿
          </span>
        </h1>
        <hr></hr>
        {/* <Container className="ml-0 mb-2">
          <Row>
            <Col xs={6} md={1}>
              <Image style={{ width: "160%", height: "100%" }} src={batman} rounded />
              <p></p>
            </Col>
            <Col xs={6} md={5}>
              <p className="reviewtitle">Batman (2012)</p>
              <Row className="reviewyear"><p className="reviewtitle"></p></Row>
            </Col>
          </Row>
        </Container> */}
        <div className="movieinfo">
          <img src={state.poster} className="movieimage img-thumbnail" alt="MovieImage" />
          <span className="movietitle">{state.title} ({state.year})</span>
        </div>

        <Form onSubmit={this.handleOnSubmit} className="form">
          <Form.Group controlId="formBasicEmail">
            <p className="title">Enter Title*</p>
            <InputGroup className="col-9">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fa fa-bars fa-fw"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control required type="text" placeholder="Enter the headline for your review here" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <p className="rating">Enter Rating*</p>
            <InputGroup className="col-9 text-center">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fa fa-star fa-fw"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                type="number"
                min="1"
                max="10"
                placeholder="Enter rating"
              />
            </InputGroup>
          </Form.Group>
          <p className="instruction">
            Enter a value from 1-10. Only 0.5 decimal increments are accepted.
          </p>
          <Form.Group controlId="formBasicEmail">
            <p className="desc">Enter Description*</p>
            <InputGroup className="col-10 text-center">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fa fa-bars fa-fw"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                as="textarea"
                type="text"
                placeholder="Write your review here"
              />
            </InputGroup>
          </Form.Group>
          <div className="row">
            <div className="col-lg-12 text-left ml-4">
              <small className="mt-2">*Required fields</small>
            </div>
          </div>
          <Button className="submitBut" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default withRouter(Review);

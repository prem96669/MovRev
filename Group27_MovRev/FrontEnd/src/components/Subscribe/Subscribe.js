// Author: Menni Prem Kumar

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, {Component} from "react";
import "./Subscribe.css";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { InputGroup } from "react-bootstrap";
import axios from "axios";
import { render } from "@testing-library/react";

class Subscribe extends Component {

  constructor(props) {
    super();
    this.state = {
      userEmail : "",
    }
  }
  async emailsubscribe(userEmail){
  try {
    const response = await axios
      .post('https://awd-backend.herokuapp.com/subscribe', {
        useremail: userEmail
      });
    alert("Thanks for subscribing :)");
  }
  catch (err) {
    console.log(err);
  }
};

  Subscribe(props) {
    const NLSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    });
  };
  handleSubmitClick = (e) => {
    this.emailsubscribe(e.email);
  };
  render(){
      return (
    <div className="container-subscribe">
      <div
        style={{ opacity: "0.9", color: "white", backgroundColor: "black" }}
        className="mx-auto card col-10 col-lg-3 login-card mt-5 "
      >
        <div className="row mb-3">
          <div className="col-lg-12 text-center">
            <h2 className="mt-2">Subscribe to Newsletter</h2>
            <small>
              We'll bundle the best of the week movies for you to make sure your
              get your weekly dose of awesomeness :)
            </small>
          </div>
        </div>
        <div className="row mt-0">
          <div className="col-lg-12">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={this.NLSchema}
              onSubmit={(e) => {
                this.handleSubmitClick(e);
              }}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="form-group">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          <i className="fa fa-envelope fa-fw"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter Email*"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-left">
                      <small className="mt-2">*Required fields</small>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block mt-4 mb-5"
                  >
                    Subscribe
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
}
export default withRouter(Subscribe);

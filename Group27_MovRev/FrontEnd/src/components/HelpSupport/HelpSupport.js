import "./HelpSupport.css";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { InputGroup } from "react-bootstrap";
class HelpSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', message: '' };
  }
  handleChange = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  }
  handleSubmitClick = (event) => {
    let response = fetch('https://safe-hamlet-70720.herokuapp.com/https://awd-backend.herokuapp.com/submitEnquiry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        message: this.state.message,
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    console.log(response)
    alert('Thank! We will get back to you soon!')
    window.location.reload(false);
    this.props.history.push("/helpsupport");

  };
  render() {
    // const NLSchema = Yup.object().shape({
    //   email: Yup.string()
    //     .email("Invalid email address format")
    //     .required("Email is required"),
    //   content: Yup.string().required("Please enter some description"),
    // });
    return (
      <div className="container-helpsupport">
        <div
          style={{ opacity: "0.9", color: "white", backgroundColor: "black" }}
          className="mx-auto card col-12   col-lg-5 login-card mt-5 "
        >
          <div className="row mb-3">
            <div className="col-lg-12 text-center">
              <h2 className="mt-2">Help and Support</h2>
              <small>Send in your queries. We're listening :)</small>
            </div>
          </div>
          <div className="row mt-0">
            <div className="col-lg-12">
              <Formik
                initialValues={{ email: "" }}
                validator={() => ({})}
                onSubmit={this.handleSubmitClick}
              >
                {({ touched, errors }) => (
                  <Form>
                    <div className="form-group">
                      <InputGroup>
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <i className="fa fa-envelope fa-fw"></i>
                          </InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <Field
                          type="email"
                          placeholder="Email*"
                          value={this.state.email}
                          name="email"
                          onChange={this.handleChange}
                          className={`form-control `}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </div>
                    <div className="form-group">
                      {/* <label htmlFor="email">Your query*</label> */}
                      <Field
                        component="textarea"

                        onChange={this.handleChange}
                        value={this.state.message}
                        name="message"
                        placeholder="Description*"
                        className={`form-control `}
                      />
                      <ErrorMessage
                        component="div"
                        name="content"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="row">
                      <div className="col-lg-12 text-left">
                        <small className="mt-2">*Required fields</small>
                      </div>
                    </div>
                    <button
                      type="submit"
                      value="submit"
                      className="btn btn-success btn-block mt-4 mb-5"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default withRouter(HelpSupport);

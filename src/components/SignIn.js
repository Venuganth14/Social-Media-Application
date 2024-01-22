import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/SignIn.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import asideImage from "./assets/signin.webp";
import Image1 from "./assets/login.jpg";
import GoogleAuth from "./googleAuth";
function SignIn() {
  const [resData, setResData] = useState(null);
  async function postSignInInfoWithGoogle(inputData) {
    let datas = {
      email: inputData.user.email,
      password: "PAF2023@@",
    };
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: datas
    });

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);

      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);

      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }

  }
  const handleAuth = (data) => {
    postSignInInfoWithGoogle(data)
    // console.log(data,"from sign in");
  }
  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);

      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);

      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }

  return (
    <Container fluid className={styles.container}  >

      <ToastContainer />
      <div className={styles.asideContainer}>
        {/* <img src={asideImage} alt="Aside"  className="login-bg-image" /> */}
      </div>
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer}
          >
            <Row className="mb-5 text-center">
              <h1 style={{ color: "#fff" }}>Sign In</h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label style={{ color: "#fff" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label style={{ color: "#fff" }}> Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success" className="btn-success" style={{ backgroundColor: "#3d85c6" }}>
              Sign In <RiLoginBoxLine />
            </Button>
            <br />
            <hr style={{ color: "#fff" }} />

            <div style={{ color: "#fff", textAlign: "center" }} >

              <p>You have no account <Link to='/signup' style={{ color: "#fff" }} >Signup</Link></p>
            </div>
            <GoogleAuth handleAuth={handleAuth} />

          </Form>
        )}
      </Formik>

    </Container>
  );
}

export default SignIn;

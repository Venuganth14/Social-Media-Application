import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  BsFillBookFill,
  BsGithub,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import {RiLoginBoxLine} from "react-icons/ri";

import styles from "./styles/HomePage.module.css";

import Logo from "./assets/logo1.webp";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("psnToken") !== null) {
      navigate("/newsfeed");
    }
  });

  return (
    <Container fluid>
      <Row className={styles.container}>
        <Col className={`${styles.colContainerLeft} ${styles.leftBackground}`}>
        </Col>
        <Col className={styles.colContainerRight}>
          <div className={styles.colWithButtons}>
            <img src={Logo} alt="PSN logo" width={120} className="mb-3" />
            <Row style={{ color: "#0d6efd" }}>
              <h1  style={{ color: "#0d6efd" }}>PAF Assignment</h1>
            </Row>
            <br />
            <Row>
              <h3  style={{ color: "#0d6efd" }}>Food Review Application</h3>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/signin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /></Button></Link>
            </Row>
            <Row>
            <Link to="/signup" className={styles.linkTextFormat}><Button variant="success" className={styles.btnHomePage}>Sign Up <BsFillPersonPlusFill /></Button></Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

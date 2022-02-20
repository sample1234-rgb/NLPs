import React from "react";
import { Row, Col } from "react-bootstrap";

function Rating({ val, text }) {
  return (
    <div className="rating">
        <Col>
        <span style={{color: '#fcdb03'}}>
        <i aria-hidden="true" className={ val >= 1 ? "fa fa-star": val >= 0.5 ?"fa fa-star-half-alt": "far fa-star"}></i>
        </span>
        <span style={{color: '#fcdb03'}}>
        <i aria-hidden="true" className={ val >= 2 ? "fa fa-star": val >= 1.5 ?"fa fa-star-half-alt": "far fa-star"}></i>
        </span>
        <span style={{color: '#fcdb03'}}>
        <i aria-hidden="true" className={ val >= 3 ? "fa fa-star": val >= 2.5 ?"fa fa-star-half-alt": "far fa-star"}></i>
        </span>
        <span style={{color: '#fcdb03'}}>
        <i aria-hidden="true" className={ val >= 4 ? "fa fa-star": val >= 3.5 ?"fa fa-star-half-alt": "far fa-star"}></i>
        </span>
        <span style={{color: '#fcdb03'}}>
        <i aria-hidden="true" className={ val >= 5 ? "fa fa-star": val >= 4.5 ?"fa fa-star-half-alt": "far fa-star"}></i>
        </span>
        <span>{" "}{ val }</span>
        </Col>
        { text &&
            <Row>
              <Col style={{ textAlign: "center" }}>
                <p style={{ color: "#bf00ff" }}>{text} ratings</p>
              </Col>
            </Row>
        }
    </div>
  );
}
export default Rating;

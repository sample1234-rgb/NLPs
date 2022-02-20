import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

function FormContainer({ children }) {
  return (
    <Container>
        <Row className="justify-content-center my-2">
            <Col xs={12} md={6}>
                { children }
            </Col>
        </Row>
    </Container>
  );
}

export default FormContainer;

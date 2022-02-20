import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="warning"
      style={{
        width: "100px",
        height: "100px",
        display: "block",
        margin: "auto"
      }}
    >
      <span className="sr-only">LOADING...</span>
    </Spinner>
  );
}
export default Loader;

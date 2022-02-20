import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate();
  function submitHandler(e){
    e.preventDefault();
    if (keyword) {
      history(`?keyword=${keyword}&page=1`)
    } else {
      history(history.locations.pathname);
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <Row style={{flexWrap: 'nowrap'}}>
        <Form.Control type='text' value={keyword} onChange={(e)=> setKeyword(e.target.value)} className="mr-sm-3 ml-sm-5"></Form.Control>
        <Button type="submit"variant="outline-success" className="" style={{width: 'fit-content'}}>Q</Button>
        
      </Row>
    </Form>
  );
}

export default SearchBox;

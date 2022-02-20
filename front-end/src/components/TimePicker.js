import React, {useState} from "react";
import { Container, Row, Col, Form, Button,Tabs,Tab } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TimePicker({ children }) {
//    var time = new Date();
    const [hrs, setHrs] = useState(Number(children.getHours()));
    const [min, setMin] = useState(Number(children.getMinutes()));
    const [maxHrs, setMaxHrs] = useState(23);
    const [maxMin, setMaxMin] = useState(59);
    const [format, setFormat] = useState(true);
    const [amToPm, setAmToPm] = useState('');
    const [val, setVal] = useState(new Date());

    function TimeFormat(is_24){
        if(is_24){
            setMaxHrs(23);
            if(hrs + 12 <= 23)
                setHrs(hrs + 12);
            setAmToPm('');
            setFormat(true);
        }
        else{
            setMaxHrs(12);
            if(hrs > 12){
                setAmToPm('PM');
                setHrs(hrs - 12);
            }
            else{
                setAmToPm('AM');
            }
            setFormat(false);
        }
    }
    console.log(val);
  return (
    <Container>
        <Tabs variant="pills" defaultActiveKey="Time" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="Time" title='Time'>
            <Row className="justify-content-center my-2">
                <Col xs={12} >
                    <Form.Check
                        type="switch"
                        id="24-hr-switch"
                        label="24 / 12"
                        checked={format}
                        onChange={(e) => TimeFormat(e.target.checked)}
                      />
                    <>
                      <Form.Label>Hours</Form.Label>
                      <Form.Range onChange={(e)=>setHrs(e.target.value)} value={hrs} max={maxHrs} />
                    </>
                    <>
                        <Form.Label>Minutes</Form.Label>
                        <Form.Range onChange={(e)=>setMin(e.target.value)} value={min} max={maxMin} />
                    </>
                    <p>{ hrs } : { min } {amToPm}</p>
                    <Button variant='success'><i className='fa fa-check'></i> Done </Button>
                </Col>
            </Row>
          </Tab>
          <Tab eventKey="Date" title="Date">
            <Row xs={2}>
                <Col md={10}>
                <Calendar onChange={setVal} value={val} />
                </Col>
            </Row>
          </Tab>
        </Tabs>
    </Container>
  );
}

export default TimePicker;

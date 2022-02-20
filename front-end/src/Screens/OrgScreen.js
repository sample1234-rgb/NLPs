import React from "react";
//import { Link, useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
function OrgScreen(){
  return (
    <div>
        <Card className="mx-5">
            <Card.Body>
                <center>
                    <Card.Text>
                        <h2>
                            <u>Terms and Conditions</u>
                        </h2>
                    </Card.Text>
                </center>
                <Card.Text>
                <ol type="A">
                    <li><b>What are Terms and Conditions Agreements?</b></li>
                    <li><b>Is a Terms and Conditions Agreement Required?</b></li>
                    <li><b>What Information to Include in Terms and Conditions</b></li>
                    <li><b>How to Enforce Terms and Conditions Agreements</b></li>
                    <li><b>Terms and Conditions FAQs</b></li>
                    <li><b>Terms and Conditions Examples</b>
                        <ol>
                            <li>The Guardian T&C</li>
                            <li>KAYAK T&Cs</li>
                            <li>Instagram T&Cs</li>
                            <li>Spotify T&Cs</li>
                        </ol>
                    </li>
                </ol>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default OrgScreen;

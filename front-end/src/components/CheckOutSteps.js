import React from "react";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CheckOutSteps({ step }) {
  return (
    <Nav className='justify-content-center mb-4 progressbar'>
        <Nav.Item id='step1' className={ step > 1 ? 'active':''}>
            { step >= 1 ?
                <Link to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </Link>
            :
                <Nav.Link disabled>Login</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item id='step2' className={ step === 2 ? 'active current': step > 2 ? 'active' : ''}>
            { step >= 2 ?
                <Link to='/shipping'>
                    <Nav.Link>shipping</Nav.Link>
                </Link>
            :
                <Nav.Link disabled>Shipping</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item id='step3' className={ step === 3 ? 'active current': step > 3 ? 'active' : ''}>
            { step >= 3 ?
                <Link to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </Link>
            :
                <Nav.Link disabled>Payment</Nav.Link>
            }
        </Nav.Item>
        <Nav.Item id='step4' className={ step === 4 ? 'active current': step > 4 ? 'active' : ''}>
            { step === 4 ?
                <Link to='/orders'>
                    <Nav.Link>Order Placed</Nav.Link>
                </Link>
            :
                <Nav.Link disabled>Order Placed</Nav.Link>
            }
        </Nav.Item>
    </Nav>
  );
}

export default CheckOutSteps;

import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {

    return (
        <Row >
            <Col sm={2}></Col>
            <Col>
                <span>MK Digital © {new Date().getFullYear()}</span>
            </Col>
            <Col>
                <li>Contact</li>
            </Col>
            <Col sm={2}></Col>
        </Row>
    )
} 





export default Footer;
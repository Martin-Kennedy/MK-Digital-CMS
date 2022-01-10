import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

const stylingObject = {
    footerStyles: {
        color: "#fff",
        width: "100vw",
        padding: "20px 10px 10px",
        margin: "0",
        display: "flex",
        alignItems: "center",
        height: "100px",
        position: "relative",
        background: "#1d1e22",
        bottom: 0,

    }
}

export default class Footer extends Component {
    render(){
        return(
            <Row style={stylingObject.footerStyles}>
                <Col>
                    MK Digital © 2021
                </Col>
            </Row>
        )
        
    }
} 
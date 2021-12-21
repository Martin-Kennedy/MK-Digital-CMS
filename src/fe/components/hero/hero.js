import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import CarouselComponent from '../carousel';



const stylingObject = {
    homepageHero: {
        height: "100vh",
        minHeight: "500px",
        width: "100vw",
        margin: "0",
        backgroundColor: "#1d1e22",
        display: "flex",
        alignItems: "center",
        padding: "120px 0 100px 0"
    },
    text: {
        fontFamily: "mr-eaves-modern, sans-serif",
        fontWeight: "700",
        fontSize: "100px",
        color: "#fff",
        textTransform: "uppercase",
        whiteSpace: "nowrap"
    }
}


export default class Hero extends Component  {

    constructor(){
        super(),
        this.state = {
           
        }
    }
    render(){
        return (
            <Row style={stylingObject.homepageHero}>
                <Col sm={2}>
                </Col>
                
                <Col sm={8}>
                    {/* Carousel */}
                    <CarouselComponent />
                </Col>
                <Col sm={2}>
                </Col>
                </Row>

        );
    }
    
}
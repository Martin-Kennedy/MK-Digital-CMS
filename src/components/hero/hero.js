import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import {LineAnimationL2R, LineAnimationR2L} from "./lineSvg";
import TextTranslation from "./textTranslation";


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
                    <div style={stylingObject.text}>
                    
                    <LineAnimationL2R />
                    
                    <TextTranslation text="Long long text to scroll" />
                    
                    <LineAnimationR2L />
                    
                    </div>
                </Col>
                <Col sm={2}>
                </Col>
                </Row>

        );
    }
    
}
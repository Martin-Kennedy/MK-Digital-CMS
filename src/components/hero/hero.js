import React, {Component} from "react";
import {Row} from 'react-bootstrap';
import {LineAnimationL2R, LineAnimationR2L} from "./lineSvg";
import TextTranslation from "./textTranslation";


const stylingObject = {
    hero: {
        height: "100vh",
        minHeight: "500px",
        width: "100%",
        margin: "0",
        backgroundColor: "#1c1c20",
        display: "flex",
        alignItems: "center"
    },
    text: {
        fontFamily: "mr-eaves-modern, sans-serif",
        fontWeight: "700",
        fontSize: "100px",
        color: "#fff",
        textTransform: "uppercase"
    }
}
const leftToRight = {
    
}
const rightToLeft = {
    
}


export default class Hero extends Component  {

    constructor(){
        super(),
        this.state = {
           
        }
    }
    render(){
        return (
            <div style={stylingObject.hero}>
                <Row style={stylingObject.text}>
                    <svg>
                        <LineAnimationL2R />
                    </svg>
                    <TextTranslation text="Long long text to scroll" />
                    <svg>
                        <LineAnimationR2L />
                    </svg>
                </Row>
            </div>
        );
    }
    
}
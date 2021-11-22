import React from "react";
import {Row} from 'react-bootstrap'
import TextTranslation from "./textTranslation";

const stylingObject = {
    hero: {
        height: "50%",
        minHeight: "500px",
        width: "100%",
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

const Hero = (props) => {
    return (
        <div style={stylingObject.hero}>
            <Row style={stylingObject.text}>
                <TextTranslation text="Long long text to scroll" />
            </Row>
        </div>
    );
}

export default Hero;
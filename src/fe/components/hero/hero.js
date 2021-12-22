import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import CarouselComponent from '../carousel';
import {LineAnimationL2R, LineAnimationR2L} from "./lineSvg";

const stylingObject = {
    homepageHero: {
        height: "100vh",
        minHeight: "500px",
        width: "100vw",
        margin: "0",
        backgroundColor: "#1d1e22",
        padding: "120px 0 100px 0"
    },
    height: {
        height: "calc(80vh - 120px)",
        position: "absolute",
        width: "inherit"
    }
}

export default class Hero extends Component {

    constructor() {
        super(),
        this.state = {}
    }
    render() {
        return (
            <Row style={stylingObject.homepageHero}>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <div style={stylingObject.height}>
                        <LineAnimationL2R/>
                        <LineAnimationR2L/>
                    </div>
                    <CarouselComponent/>
                </Col>
                <Col xs={1}></Col>
            </Row>

        );
    }

}
import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import { connect } from "react-redux";
import { getCurrentCarouselAnimatedText } from "../../actions/homepage.actions";
import CarouselComponent from '../carousel';
import {LineAnimationL2R, LineAnimationR2L} from "./lineSvg";
import TextTranslation from "./textTranslation";
import styled from 'styled-components'
import SvgBlob from "../blobSvg";

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

const PositionAbsolute = styled.div`
position: relative;
`

const mapStateToProps = state => {
    console.log(state)
    return {
        carouselText: state.homepage.carouselText,
        currentSlide: state.homepage.currentSlide
    }
}

const getCarouselText = (text, currentSlide) => {
    const currentText = text[currentSlide];
    return currentText;
}

class Hero extends Component {
    render() {
        return (
            <Row style={stylingObject.homepageHero}>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <div style={stylingObject.height}>
                        <LineAnimationL2R/>
                        <TextTranslation text={getCarouselText(this.props.carouselText, this.props.currentSlide)}/>
                        <SvgBlob/>
                        <LineAnimationR2L/>
                    </div>
                    <CarouselComponent/>
                </Col>
                <Col xs={1}></Col>
            </Row>

        );
    }

}

export default connect(mapStateToProps)(Hero)
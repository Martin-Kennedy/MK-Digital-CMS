import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { LineAnimationL2R, LineAnimationR2L } from "./hero/lineSvg";
import TextTranslation from "./hero/textTranslation";
import { Carousel } from 'react-responsive-carousel';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return { homepageData: state.homepage.homepageData}
}



const createHeroCarouselItem = (props) => (
    props.homepageData.homepageCarousel.homepageCarouselArray.map((carousel, index) => {
        return <div key={index}>
            <LineAnimationL2R />
            <TextTranslation text={carousel.subject} />
            <img src={carousel.homepageHeroCardImage} />
            <p className="legend">Legend {index}</p>
            <LineAnimationR2L />
        </div>;
    }));





class CarouselComponent extends Component {
    render(){
    return (
    <Carousel axis="vertical" autoFocus={true} showThumbs={false} showStatus={false} useKeyboardArrows >
        {createHeroCarouselItem(this.props)}
    </Carousel>
    )
    }
};

export default connect(mapStateToProps)(CarouselComponent);
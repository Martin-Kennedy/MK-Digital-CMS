
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import styled from 'styled-components';

const SlideCounterRow = styled(Row)`
    position: absolute;
    color: #fff;
    bottom: 100px;
    width: 100vw;
    left: 0;
    top: 85vh;
    z-index: 999;
    
`

const SlideCounterWrapper = styled.div`
padding: 5px 15px;
font-weight: 100;
font-size: 13px;
border: 1px solid #fff;
width: 70px;
margin: 0 auto 0 0;
    text-align: center;
span:first-child {
    padding-right 12px;
    border-right: 1px solid white;
}
span:nth-child(2) {
    padding-left 12px;
}
`

const mapStateToProps = state => {
    return {
        totalSlides: state.homepage.totalSlides,
        currentSlide: state.homepage.currentSlide + 1,
    }
}
const SlideCounterComponent = (props) => {
   
    return (
        <SlideCounterRow>
            <Col xs={1}></Col>
            <Col xs={10}>
            {(props.currentSlide > 0) ?
            <SlideCounterWrapper>
                 <span>{props.currentSlide}</span>
            <span>{props.totalSlides}</span> 
                    </SlideCounterWrapper>: null }
                </Col>
                <Col xs={1}></Col>
                
        </SlideCounterRow>
    )
};
export default connect(mapStateToProps)(SlideCounterComponent);
import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextScrollTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';

const StyledAboutPageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
    z-index: 2;
    position: relative;
`

const FirstSection = styled.div`
    height: calc(33vh - 66px);
    position: relative;
    margin: 200px 0 0 0;
    width: 100%;
    top: 0%;
    svg:first-child {
    transform: rotate(180deg);
    position: absolute; 
    top: 0;
    right: -3%;
    line {
        stroke: #fff;
    }
    }
    svg:last-child {
    position: absolute; 
    bottom: 0;
    left: -3%;
    line {
        stroke: #fff;
        width: 100%;
    }
    }
    `;

const SecondSection = styled(FirstSection)`
margin: 0;
`

const ThirdSection = styled(FirstSection)`
margin: 0;`

const AnimatedTextContainer = styled.div`
        >div{
            >div {
                font-family: mr-eaves-modern, sans-serif;
                font-weight: 200;
                font-size: 7vw;
                align-items: center;
                display: flex;
                top: 0;
                color: #fff;
                text-transform: uppercase;
                white-space: nowrap;
                letter-spacing: 1.5rem;
                position: absolute;
                left: -1%;
                height: calc(33vh - 66px);
                @media(max-width: 690px){
                        font-size: 13vw;
                        letter-spacing: 2vw;
                        display: flex;
                        align-items: center;
                }
            }
        }     
`
const TextTop = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 7vw;
        align-items: center;
        display: flex;
        top: 0;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: absolute;
        left: -1%;
        height: calc(33vh - 66px);
        @media(max-width: 690px){
                font-size: 13vw;
                letter-spacing: 2vw;
                display: flex;
                align-items: center;
        }
`



const mapStateToProps = state => {
    return { 
            about: {
                aboutData: state.about.aboutData
            }
        }
}



class AboutPageHero extends Component {
    
    render() {
        let item = this.props.about.aboutData[0];
        return (
            <StyledAboutPageHero>
                <Col xs={1} sm={2}></Col>
                <Col xs={10} sm={8}>
                    <FirstSection>
                        <LineAnimationL2R />
                        <TextTop>{item.aboutHeroLineOne}</TextTop>
                        <LineAnimationL2R />
                    </FirstSection>
                    <SecondSection>
                    <AnimatedTextContainer>
                        <TextScrollTranslation ratio3rd text={item.aboutHeroLineTwo}  />
                    </AnimatedTextContainer>
                    </SecondSection>
                    <ThirdSection>
                        <LineAnimationL2R />
                        <TextTop>{item.aboutHeroLineThree}</TextTop>
                        <LineAnimationL2R />
                    </ThirdSection>
                </Col>
                <Col xs={1}  sm={2}></Col>
            </StyledAboutPageHero>

        );
    }

}

export default connect(mapStateToProps)(AboutPageHero)
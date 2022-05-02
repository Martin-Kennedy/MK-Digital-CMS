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

const FirstLine = styled.div`
    height: 0;
    position: relative;
    padding: 120px 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;
    svg {
    position: relative; 
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const SecondLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const ThirdLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const FourthLine = styled.div`
    height: 0;
    position: relative;
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    width: 100%;
    top: 0%;

    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: #fff;
    }
    }
    `;

const AnimatedTextContainer = styled.div`
        position: absolute;
        top: calc(50% - 65px);
        right: 0;
`
const TextTop = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 100px;
        color: #fff;
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        left: 3%;
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
                <Col xs={2}></Col>
                <Col xs={8}>
                    <FirstLine>
                        <LineAnimationL2R />
                        <TextTop>{item.aboutHeroLineOne}</TextTop>
                    </FirstLine>
                    <SecondLine>
                        <LineAnimationR2L />
                    </SecondLine>
                    <AnimatedTextContainer>
                        <TextScrollTranslation text={item.aboutHeroLineTwo}  />
                    </AnimatedTextContainer>
                    <ThirdLine>
                        <LineAnimationL2R />
                        <TextTop>{item.aboutHeroLineThree}</TextTop>
                    </ThirdLine>
                    
                    <FourthLine>
                        <LineAnimationR2L />
                    </FourthLine>
                </Col>
                <Col xs={2}></Col>
            </StyledAboutPageHero>

        );
    }

}

export default connect(mapStateToProps)(AboutPageHero)
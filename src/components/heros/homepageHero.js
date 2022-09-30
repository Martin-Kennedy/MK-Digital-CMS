import React, {Component} from "react";
import {Row, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import HomepageCarouselComponent from '../carousels/homepageCarousel';
import styled from 'styled-components';
import SlideCounterComponent from "../carousels/slideCounter";
import MediaQuery from 'react-responsive';
import variables from '../../variables.module.scss';
import AnimatedText from 'react-animated-text-content';
import { Link } from 'react-router-dom';


const StyledHomepageHero = styled(Row)`
    height: 100vh;
    background-color: #1d1e22;
`

const CarouselContainer = styled.div `
    position: absolute;
    overflow: hidden;
    display: flex;
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh;
    margin: 0 auto 0 auto;

`


const StyledLink = styled(Link)`
cursor: pointer;
width: 100%;
height: 100%;
@media(max-width: ${variables.medium}){
            width: 50vw;
            left: 25vw;
    }
`

const AnimatedTextContainer = styled.div`
position: absolute;
top: 20vh;
height: 10vw;
width: 30vw;
z-index: 2;
 @media(max-width: ${variables.medium}){
        width: 50vw;
        top: 15vh;
     }

`

const AnimatedDescriptionContainer = styled.div`
position: absolute;
top: 85vh;
height: 10vw;
width: 100vw;
z-index: 2;
left: 0;
`

const StyledAnimatedText = styled(AnimatedText)`
height: 100%;
width: 100%;
font-weight: 200;
font-size: 2rem;
color: #fff;
text-transform: uppercase;
letter-spacing: 1.5rem;
postion: absolute;
text-align: left;
@media(max-width: ${variables.medium}){
    font-weight:500;
    font-size: 1.5rem;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    letter-spacing: .75rem;
    }
`


const StyledAnimatedDescription = styled(AnimatedText)`
font-weight: 200;
font-size: .7rem;
text-align: center;
color: #fff;
display: block;
text-transform: uppercase;
letter-spacing: .1rem;
margin: 0 auto;
width: 15vw;
height: 100%;
`
const AnimatedLinkContainer = styled.div`
position: absolute;
top: 50vh;
z-index: 2;
    @media(max-width: ${variables.medium}){
    top: 70vh;
    }
`

const StyledAnimatedLink = styled(AnimatedText)`
font-weight: 200;
font-size: 1.25rem;
text-align: center;
color: #fff;
text-transform: uppercase;
letter-spacing: .3rem;
text-align: center;
margin: 0;
height: 100%;
border: 1px solid var(--white);
opacity: .7;
transition: .25s linear;
padding: .5rem 1rem;
&:active, &:hover {
    transform: scale(1.2);
    opacity: 1;
    cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;

}
    @media(max-width: ${variables.medium}){
    font-size: .9rem;
    padding: .75rem 1.5rem;
    font-weight: 700;
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.75);
    letter-spacing: .25rem;
    }
`

const mapStateToProps = state => {
    return {
            carouselText: state.homepage.carouselText,
            currentSlide: state.homepage.currentSlide,
            previousSlide: state.homepage.previousSlide,
            orderedSlides: state.homepage.orderedSlides,
            bkgColor: state.homepage.bkgColor,
            imgWidth: state.homepage.imgWidth
        }
}

const getCarouselText = (orderedSlides, currentSlide) => {
    if(orderedSlides.length){
        const currentText = orderedSlides[currentSlide].textTranslation;
        return currentText;
    }
    
}

const getCarouselDescription = (orderedSlides, currentSlide) => {
    if (orderedSlides.length) {
        const currentText = orderedSlides[currentSlide].description ? orderedSlides[currentSlide].description : "";
        return currentText;
    }

}

const getSlides = (currentSlide, previousSlide) => {
    return {currentSlide: currentSlide, previousSlide: previousSlide}
}

const getLink = (orderedSlides, currentSlide) => {
    if (orderedSlides[currentSlide]){
    let title = orderedSlides[currentSlide].blogTitle !== null  ? { type: 'blog', title: orderedSlides[currentSlide].blogTitle.title } : { type: 'project', title: orderedSlides[currentSlide].clientName.client };
    let titleSlug = title.title.replace(/\s+/g, '-');
    return `${title.type}/${titleSlug}`
    }
    
}

const getLinkText = (orderedSlides, currentSlide) => {
    if (orderedSlides[currentSlide]) {
        let linkText = orderedSlides[currentSlide].linkText ? orderedSlides[currentSlide].linkText : "";
        return linkText;
    }

}




class HomepageHero extends Component {

    constructor(){
        super()
        this.state = {
            width: window.innerWidth
        }
    } 

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevProps){
        
    }
    render() {
        return (
            <StyledHomepageHero>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <AnimatedTextContainer>
                        <StyledAnimatedText
                            type="words" // animate words or chars
                            animation={{
                                x: '200px',
                                y: '-20px',
                                scale: 1.1,
                                ease: 'ease-in-out',
                            }}
                            animationType="float"
                            interval={0.06}
                            duration={1.5}
                            tag="p"
                            className="animated-paragraph"
                            threshold={0.1}
                            rootMargin="10%"
                        >
                            {getCarouselText(this.props.orderedSlides, this.props.currentSlide)}
                            
                        </StyledAnimatedText>
                    </AnimatedTextContainer>
                    <AnimatedLinkContainer>
                        <StyledLink to={getLink(this.props.orderedSlides, this.props.currentSlide)}>
                            <StyledAnimatedLink
                                type="words"
                                animation={{
                                    x: '200px',
                                    y: '-20px',
                                    scale: 1.1,
                                    ease: 'ease-in-out',
                                }}

                                interval={0.2}
                                duration={1.2}
                                tag="div"
                                threshold={0.1}
                                rootMargin="20%">

                                {getLinkText(this.props.orderedSlides, this.props.currentSlide)}

                            </StyledAnimatedLink>
                        </StyledLink>
                    </AnimatedLinkContainer>
                    <MediaQuery minWidth={variables.large}>
                        <AnimatedDescriptionContainer>
                            <StyledAnimatedDescription
                                type="words"
                                interval={0.0}
                                duration={2}
                                tag="p"
                                threshold={0.1}
                                rootMargin="20%">
                                {getCarouselDescription(this.props.orderedSlides, this.props.currentSlide)}
                            </StyledAnimatedDescription>
                        </AnimatedDescriptionContainer>
                    </MediaQuery>
                   
                    
                    <CarouselContainer imgWidth={this.props.imgWidth}>
                    <HomepageCarouselComponent/>
                    </CarouselContainer>
                    <MediaQuery minWidth={690}><SlideCounterComponent /></MediaQuery>
                </Col>
                <Col xs={1}></Col>
            </StyledHomepageHero>

        );
    }

}

export default connect(mapStateToProps)(HomepageHero)
import React from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { SmallAndThinTextSpaced, SmallAndThinText, Line, MediumText, displayValueArray } from '../../helpers/commonStyledComponents';
import { FadeInWhenVisibleScale, FadeInWhenVisibleOpacity } from '../../helpers/fadeInOnViewport';

const SlideNavLeft = styled.nav`
position: absolute;
top: -20px;
left: calc(-70vw - 10px);
width: 70vw;
height: 100vh;
background-color: #000;
transition: .75s ease-in-out;
z-index: 2;
`

const SlideLogo = styled.div`
    background-image: url('logo.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 101px;
    height: 68px;
    position: relative;
    left: 50px;
    top: 20px;
    z-index: 999;
`;
const Ul = styled.ul`
    display: block;
    padding: 10px 0;
`

const Li = styled.li`
    color:  white !important;
    svg {
        path {
            stroke: white !important;
        }
    }
    margin: 0 5rem 0 0;
    display: inline-block;
    position: relative;
    svg {
    position: absolute;
    bottom: 3.2rem;
    right: -4rem;
    height: 26px;
    width: 41px;
    }

    
`
const StyledLink = styled(Link)`
font-family: mr-eaves-modern, sans-serif;
font-weight: 300;
font-size: 5vw;
    line-height: 1.2;
margin: 0;
text-decoration: none !important;
`


const SlideNavRight = styled.nav`
position: absolute;
top: -20px;
right: calc(-30vw - 10px);
width: 30vw;
height: 100vh;
background-color: #0e5d97;
transition: .75s ease-in-out;
overflow: hidden;
z-index: 2;
`
const HeadingRight = styled(Row)`
position: relative;
top: 20vh;
`
const HeadingLeft = styled(Row)`
position: relative;
top: 20vh;
`

const StyledSlideNav = styled(Nav)`
width: 100%;
`


const WaveFormBottom = styled.div`
position: absolute;
bottom: 40vh;
height: 0;
`

const WaveWrapper = styled(motion.div)`
    width: 130vw;
    height: 10vh;
    left: 0;
    position: relative;
    
        x: 0;
        svg {
            position: relative;
            left: calc(-2000px + 70vw);
            transform: scale(2, 1);
            opacity: 0.3;
            stroke-width: 1.5px;
        }
`

const WaveWrapper2 = styled(WaveWrapper)`
        top: -8vh;
`
const WaveWrapper3 = styled(WaveWrapper)`
        top: -16vh;
`
const WaveWrapper4 = styled(WaveWrapper)`
        top: -24vh;
`
const WaveWrapper5 = styled(WaveWrapper)`
        top: -30vh;
`
const WaveWrapper6 = styled(WaveWrapper)`
        top: -33vh;
`
const WaveWrapper7 = styled(WaveWrapper)`
        top: -36vh;
`

const StyledPath = styled(motion.path)`
    width: 2000px;
    strokeLinecap: "round";
    fill: "transparent";
    stroke: #fff;
    
`  


export const NavOffCanvasLeft = (props) => {
    const d = [
        "m-17.8273,111.16671c20.66565,-0.55532 37.66464,-38.11063 62.99696,-38.66596c28.3335,0.22223 43.33368,37.77777 67.00051,37.66666c25.77793,-0.33334 39.22252,-15.99997 68.33378,-16.99997c26.22238,0.33334 43.44477,16.66663 67.66716,16.99997c30.1113,-0.33334 50.88927,-37.99998 81.33391,-37.99999c33.22242,0.00001 59.1115,37.33332 87.66726,37.99999c33.11131,-0.22223 46.8893,-14.77774 78.00061,-15.3333c32.77794,0.77776 55.22254,14.22218 77.66715,14.66662c29.55574,-0.66667 52.11147,-39.33331 87.66721,-39.99998c30.55573,0.88889 50.11149,38.77776 75.66723,39.66665c26.00018,0 41.16712,-16.66663 74.83396,-17.3333c29.22238,0.11111 52.27802,16.55552 74.16707,17.3333c23.38901,-0.72228 36.27808,-37.94437 59.66709,-38.16666c21.61114,0.22228 42.72229,38.44437 62.33344,39.16665",
        "m-17.8273,111.16671c20.66565,-0.55532 37.66464,-38.11063 62.99696,-38.66596c28.3335,0.22223 41.33368,23.77776 65.00051,23.66665c25.77793,-0.33334 39.22252,-21.99998 68.33378,-22.99998c26.22238,0.33334 43.44477,26.66664 67.66716,26.99998c30.1113,-0.33334 52.88927,-27.99997 83.33391,-27.99998c33.22242,0.00001 58.1115,17.3333 86.66726,17.99997c33.11131,-0.22223 46.8893,-20.77775 78.00061,-21.33331c32.77794,0.77776 57.22254,36.2222 79.66715,36.66664c29.55574,-0.66667 51.11147,-35.3333 86.66721,-35.99997c30.55573,0.88889 46.11149,26.77775 71.66723,27.66664c26.00018,0 41.16712,-26.66664 74.83396,-27.33331c29.22238,0.11111 56.27803,22.55553 78.16708,23.33331c23.38901,-0.72228 36.27808,-21.94436 59.66709,-22.16665c21.61114,0.22228 42.72229,38.44437 62.33344,39.16665",
        "m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
    ]
    return (
    <SlideNavRight
        className={props.isOpen ? 'slideInLeft' : null}
        >   <FadeInWhenVisibleScale>
            <HeadingRight>
                <Row>
                <Col xs={1}></Col>
                    <Col ><SmallAndThinTextSpaced white>Charge & Bless</SmallAndThinTextSpaced></Col>
                <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col>
                    <Col><Line white></Line> </Col>
                    <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col>
                    <Col><MediumText white> When the wave breaks here, don’t be there. </MediumText><SmallAndThinText white>-Turtle</SmallAndThinText></Col>
                    <Col xs={1}></Col>
                </Row>
            </HeadingRight>
            </FadeInWhenVisibleScale>
            
            <WaveFormBottom>
                <AnimatePresence>
                    {props.isOpen && (
                <FadeInWhenVisibleOpacity duration={1.75}>
                
                        <div>
                            <WaveWrapper
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: 1,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper>
                            <WaveWrapper2
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: 2.25,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper2>
                            <WaveWrapper3
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: .5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper3>
                            <WaveWrapper4
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: .75,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper4>
                            <WaveWrapper5
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 1.25,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: 1.75,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper5>
                            <WaveWrapper6
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: .5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: .35,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper6>
                            <WaveWrapper7
                                animate={{ x: 1000 }}
                                transition={{
                                    ease: 'linear',
                                    duration: 20,
                                    times: [0, 0.32, 0.48, 0.64, .8, 1],
                                    delay: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                <svg x="0px" y="0px" width="1000" height="200" fill="none" viewBox="0 0 1000 200" >
                                    <StyledPath
                                        animate={{ d: d }}
                                        d="m-17.8273,111.16671c20.66565,-0.55532 38.66464,-28.11062 63.99696,-28.66595c28.3335,0.22223 42.33368,27.77776 66.00051,27.66665c25.77793,-0.33334 39.22252,-27.99998 68.33378,-28.99998c26.22238,0.33334 43.44477,28.66664 67.66716,28.99998c30.1113,-0.33334 51.88927,-27.99997 82.33391,-27.99998c33.22242,0.00001 58.1115,27.33331 86.66726,27.99998c33.11131,-0.22223 44.8893,-25.77775 76.00061,-26.33331c32.77794,0.77776 57.22254,25.22219 79.66715,25.66663c29.55574,-0.66667 57.11147,-28.3333 92.66721,-28.99997c30.55573,0.88889 45.11149,27.77775 70.66723,28.66664c26.00018,0 40.16712,-28.66664 73.83396,-29.33331c29.22238,0.11111 53.27802,28.55553 75.16707,29.33331c23.38901,-0.72228 36.27808,-28.94437 59.66709,-29.16665c21.61114,0.22228 42.72229,29.44437 62.33344,30.16664"
                                        transition={{
                                            ease: [.57, .21, .69, 1.25],
                                            duration: 3,
                                            times: [0, 0.32, 0.48, 0.64, .8, 1],
                                            delay: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}>

                                    </StyledPath>
                                </svg>
                            </WaveWrapper7>
                            
                        </div>

                    </FadeInWhenVisibleOpacity>
                    )}
                </AnimatePresence>
                
            </WaveFormBottom>
            
    </SlideNavRight>)
}

export const NavOffCanvasRight = (props) => {
    
    return (<SlideNavLeft
        className={props.isOpen ? 'slideInRight' : null}
    >
        <AnimatePresence>
            {props.isOpen && (
        <div>
                    <FadeInWhenVisibleOpacity duration={2.5}>
                        <SlideLogo></SlideLogo>
                    </FadeInWhenVisibleOpacity>
                
        <HeadingLeft>
                    
            <FadeInWhenVisibleScale>
            <Row>
                
                <Col xs={2}></Col>
                <Col ><SmallAndThinTextSpaced white>Work</SmallAndThinTextSpaced></Col>
                <Col xs={1}></Col>
                
            </Row>
            <Row>
                
                <Col xs={2}></Col>
                <Col><Line white></Line> </Col>
                <Col xs={1}></Col>
            </Row>
                    </FadeInWhenVisibleScale>
            
            <Row>
                <Col xs={2}></Col>
                <Col>
            <StyledSlideNav >
                <Ul >
                        
                    <Li location={props.location}>
                                <FadeInWhenVisibleScale duration={1}>

                        <StyledLink to={'/projects'} >
                                    Projects
                        </StyledLink>
                                </FadeInWhenVisibleScale>
                    </Li>
                            
                            
                    <Li location={props.location}>
                                <FadeInWhenVisibleScale duration={1.25}>
                    <StyledLink to={'/contributions'} location={props.location}>
                                    Contributions 
                    </StyledLink>
                                </FadeInWhenVisibleScale>
                                </Li>
                                
                                
                    <Li location={props.location}>
                                <FadeInWhenVisibleScale duration={1.5}>
                        <StyledLink to={'/about'} location={props.location}>
                                    About 
                        </StyledLink>
                                </FadeInWhenVisibleScale>
                    </Li>
                    <Li location={props.location}>
                                <FadeInWhenVisibleScale duration={1.75}>
                    <StyledLink to={'/blog'} location={props.location}>
                                    Blog 
                    </StyledLink>
                                </FadeInWhenVisibleScale>
                    </Li> 
                            
                            
                    <Li location={props.location}>
                                <FadeInWhenVisibleScale duration={2}>
                        <StyledLink to={'/contact'} location={props.location}>
                                    Contact 
                        </StyledLink>
                                </FadeInWhenVisibleScale>
                    </Li> 
                            



                </Ul>

            </StyledSlideNav>
            </Col>
            <Col xs={1}></Col>
            </Row>
                    
        </HeadingLeft>
        </div>
        )}</AnimatePresence>
        
    </SlideNavLeft>)
}
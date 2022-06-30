import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';
import { VerySmallText } from '../../helpers/commonStyledComponents';
import variables from '../../variables.module.scss';

const StyledProjectPageHero = styled(Row)`
    height: 100vh;
    background-color: var(--white);
    z-index: 2;
    margin-top: 50px;
    position: relative;
`

const FirstLine = styled.div`
    height: calc(25vh - 40px);
    position: relative;
    margin: 120px 0 0;
    width: 100%;
    
    div {
         font-size: 100px;
         top: -3vh;
        @media (max-width: 900px) {
            font-size: 12vw;
        }
    }
    svg {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    
    `;

const SecondLine = styled.div`
    height: 0;
    position: relative;
    
    z-index: 0;
    padding: 0 0 calc(25vh - 40px) 0;
    width: 100%;
    
    div {
         font-size: 100px;
         top: -3vh;
        @media (max-width: 900px) {
            font-size: 12vw;
        }
    }
    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
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
    div {
         font-size: 100px;
        @media (max-width: 900px) {
            font-size: 12vw;
        }
    }
    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
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
    div {
         font-size: 100px;
        @media (max-width: 900px) {
            font-size: 12vw;
        }
    }
    svg  {
    position: relative; 
    left: 0;
    line {
        stroke: var(--black);
    }
    }
    `;

const StaticHeroText = styled.div`
        font-family: mr-eaves-modern, sans-serif;
        font-weight: 200;
        font-size: 7vw;
        @media (max-width: 900px) {
            font-size: 8vw;
            top: 2vw;
            letter-spacing: 1.3vw;
            
        }
        
        color: var(--black);
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        left: 3%;
        line-height: 100px;
`
const ProjectHeroVerySmallText = styled(VerySmallText)`
padding-left: 1.5vw;
font-size: 1.25vw;
opacity: .6;
@media(max-width: ${variables.medium}){
font-size: 3vw;
}
`

const HeromImageContainer = styled.div`
height: 33vw;
width: 33vw;
margin: 15vw 0;
position: absolute;
right: 15vw;
top: 0;
@media (max-width: 900px) {
    margin: 0;
    width: 66vw;
    height: 66vw;
    top: 80vh;
    right: 20vw;
}
`
const HeroImage = styled.div`
background-image: ${props => props.heroImg ? `url(${props.heroImg})` : null};
background-size: contain;
background-repeat: no-repeat;
    width: 100%;
    height: 100%;
`
const WebsiteLink = styled.a`
    background-color: ${props => props.color ? props.color : 'var(--black)'};
    width: 15vh;
    height: 15vh;
    border-radius: 100%;
    position: absolute;
    top: 0;
    margin: 50vh 0 0 0;
    left: 25vw;
    color: var(--white);
    font-size: 2.25vh;
    letter-spacing: .25vh;
    font-weight: 500;
    text-align: center;
    line-height: 15vh;
    &:hover {
        cursor: pointer;
        color: var(--white);
    }
    @media (max-width: ${variables.medium}) {
    width: 8vh;
    height: 8vh;
    line-height: 2vh;
    line-height: 2.25vh;
    font-size: 3vw;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 85vh;
}
`
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nove", "Dec"
];
const formatDate = (date) => {
    const d = new Date(date);
    return `${monthNames[d.getMonth()]} - ${d.getFullYear()}`;
}


const ProjectPageHero = props => {

    const [mouseLeft, setMouseLeft] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimensions)

        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [width])

        return <StyledProjectPageHero>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <FirstLine>
                        <LineAnimationL2R />
                        <ProjectHeroVerySmallText>Project</ProjectHeroVerySmallText>
                        <TextTranslation 
                        duration={35} 
                        delay={.5}
                        reverse
                        black
                        screenWidth={width}
                        text={props.item.title} />
                        </FirstLine>
                        <SecondLine>
                        <LineAnimationR2L />
                        
                        <ProjectHeroVerySmallText>Client / Expertise</ProjectHeroVerySmallText>
                        <TextTranslation 
                        duration={40}
                         delay={.75} 
                         black
                        screenWidth={width}
                            text={`${props.item.client}  -  ${props.item.expertise}`} />
                    </SecondLine>
                        <ThirdLine>
                        <LineAnimationL2R />
                        <ProjectHeroVerySmallText>Launch Date</ProjectHeroVerySmallText>
                        <StaticHeroText >
                            {formatDate(props.item.launchDate)}
                            </StaticHeroText>
                    </ThirdLine>
                    <FourthLine>
                        <LineAnimationR2L />
                    </FourthLine>
                    <HeromImageContainer>
                    <HeroImage heroImg={props.item.heroImage.publicUrl}>
                        </HeroImage>
                    </HeromImageContainer>
                {props.item.externalLink ?
                <WebsiteLink href={props.item.externalLink} target="_blank" color={props.item.buttonColor} className={mouseLeft === true ? 'projectSiteLinkHoverOut' : mouseLeft === false ?'projectSiteLinkHoverIn' : null} onMouseEnter={() => setMouseLeft(false)} onMouseLeave={() => setMouseLeft(true)}>Visit Site</WebsiteLink>
                : null}
                </Col>
                <Col xs={2}></Col>
            </StyledProjectPageHero>

};

export default ProjectPageHero;
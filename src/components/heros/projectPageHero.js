import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { LineAnimationL2R, LineAnimationR2L } from "../designElementComponents/lineSvg";
import { TextTranslation } from "../../helpers/textTranslation";
import styled from 'styled-components';
import { VerySmallText } from '../../helpers/commonStyledComponents';

const StyledProjectPageHero = styled(Row)`
    height: 100vh;
    background-color: var(--white);
    z-index: 2;
    position: relative;
`

const FirstLine = styled.div`
    height: calc(25vh - 40px);
    position: relative;
    margin: 120px 0 0;
    width: 100%;
    top: 0%;
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
    top: 0%;

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
        font-size: 100px;
        color: var(--black);
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1.5rem;
        position: relative;
        left: 3%;
        line-height: 100px;
`
const ProjectHeroVerySmallText = styled(VerySmallText)`
padding-left: 26px;
`

const HeromImageContainer = styled.div`
height: 60vh;
width: 72vh;
margin: 20vh 0;
position: absolute;
right: 15vw;
top: 0;
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
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 15vh;
    &:hover {
        cursor: pointer;
        color: var(--white);
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
                        text={props.item.title} />
                        </FirstLine>
                        <SecondLine>
                        <LineAnimationR2L />
                        
                        <ProjectHeroVerySmallText>Client / Expertise</ProjectHeroVerySmallText>
                        <TextTranslation 
                        duration={40}
                         delay={.75} 
                         black 
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
                {console.log(props.item)}
                <WebsiteLink href={props.item.externalLink} target="_blank" color={props.item.cardColor} className={mouseLeft === true ? 'projectSiteLinkHoverOut' : mouseLeft === false ?'projectSiteLinkHoverIn' : null} onMouseEnter={() => setMouseLeft(false)} onMouseLeave={() => setMouseLeft(true)}>Visit Site</WebsiteLink>
                </Col>
                <Col xs={2}></Col>
            </StyledProjectPageHero>

};

export default ProjectPageHero;
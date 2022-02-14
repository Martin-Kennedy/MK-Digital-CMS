import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { generateHsl } from '../../helpers/utilities';
import { FadeInWhenVisibleOpacity } from '../../helpers/fadeInOnViewport';
import { Link } from 'react-router-dom';

const MasonryBlog = styled(Masonry)`
margin-left: auto;
margin-right: auto;
padding: 0;
width: 100%;
`;




const CardTextRow = styled(Row)`
--bs-gutter-x: 0;
`;

const CardTitle = styled(Col)`
font-weight: 500;
font-size: 1.2rem;
text-align: left;
color: #fff;
padding: 20px 10px 0px 10px;
position: absolute;
top: 25px;
transition: 500ms ease-in;
opacity: 0;
`;

const CardBlurb = styled(Col)`
font-weight: 300;
font-size: .8rem;
text-align: left;
color: #fff;
padding: 10px;
position: absolute;
top: 75px;
transition-timing-function: ease-in;
transition-duration: 500ms ;
transition-delay: .2s;
opacity: 0;
`;

const mapStateToProps = state => {
    return {
        projects: {
            projectData: state.projects.projectData,
            filteredData: state.projects.filteredData,
            sortBy: state.projects.sortBy,
            activeButton: state.projects.activeButton
        }
    }
};

class FilteredCards extends Component {
    render() {
        return (
            <MasonryBlog
                elementType={'div'}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}>

                {this
                    .props
                    .projects
                    .filteredData
                    .map((projectEntry, index) => {
                        let id = projectEntry.id;

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${projectEntry.height}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${generateHsl()};
                                transition: 500ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 50px);
                                margin: 20px;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                &:hover, &:focus {
                                    ${ContainerDiv} {
                                    filter: brightness(70%);
                                    cursor: pointer;
                                    }
                                    .styledImage {
                                    transform: scale(.97);
                                    }
                                    ${CardTitle} {
                                    opacity: 1;
                                    transform: translateY(-10px);
                                    }
                                    ${CardBlurb} {
                                    opacity: 1;
                                    transform: translateY(-10px);
                                    }
                                }`;




                        const card = <MasonryBlogCard key={id} className="grid-item">
                            <FadeInWhenVisibleOpacity>

                                <ContainerDiv>
                                    <Row>
                                        <FittedImage className='styledImage' src={projectEntry.projectCardImage} />
                                    </Row>
                                </ContainerDiv>
                                <CardTextRow>
                                    <CardTitle className='styledTitle' xs={12}>{projectEntry.title}</CardTitle>
                                    <CardBlurb className='styledBlurb' xs={12}>{projectEntry.blurb}</CardBlurb>
                                </CardTextRow>
                            </FadeInWhenVisibleOpacity>
                        </MasonryBlogCard>;
                        return card;
                    })}
            </MasonryBlog>

        )
    }
}

class UnfilteredCards extends Component {
    render() {
        return (
            <MasonryBlog
                elementType={'div'}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}>
                {this
                    .props
                    .projects
                    .projectData
                    .map((projectEntry, index) => {
                        let id = projectEntry.id;

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${projectEntry.height}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${generateHsl()};
                                transition: 500ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 50px);
                                margin: 20px;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                &:hover, &:focus {
                                    ${ContainerDiv} {
                                    filter: brightness(70%);
                                    cursor: pointer;
                                    }
                                    .styledImage {
                                    transform: scale(.97);
                                    }
                                    ${CardTitle} {
                                    opacity: 1;
                                    transform: translateY(-10px);
                                    }
                                    ${CardBlurb} {
                                    opacity: 1;
                                    transform: translateY(-10px);
                                    }
                                }`;
                        let titleSlug = projectEntry.title;
                        titleSlug = titleSlug
                            .replace(/\s+/g, '-');
                        const card = <MasonryBlogCard key={id} className="grid-item">
                            <Link to={`project/${titleSlug}`}>
                                <FadeInWhenVisibleOpacity>
                                    
                                    <ContainerDiv>
                                        <Row>
                                            <FittedImage className='styledImage' src={projectEntry.projectCardImage} />
                                        </Row>
                                    </ContainerDiv>
                                    <CardTextRow>
                                        <CardTitle className='styledTitle' xs={12}>{projectEntry.title}</CardTitle>
                                        <CardBlurb className='styledBlurb' xs={12}>{projectEntry.blurb}</CardBlurb>
                                    </CardTextRow>
                                </FadeInWhenVisibleOpacity>
                            </Link>
                        </MasonryBlogCard>

                        return card;

                    })}
            </MasonryBlog>
        )
    }
}

export const FilteredCardsContainer = connect(mapStateToProps)(FilteredCards);
export const UnfilteredCardsContainer = connect(mapStateToProps)(UnfilteredCards);
import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import variables from '../../variables.module.scss';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
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
font-size: 2vw;
line-height: 2vw;
text-align: left;
color: #fff;
padding: 1vw 1.5vw;
position: absolute;
transition: 500ms ease-in;
opacity: 0;
@media(max-width: ${variables.medium}){
    font-size: 7vw;
    line-height: 8vw;
    padding: 3vw 5vw;
    top: 6vw;
}
`;

const CardBlurb = styled(Col)`
font-weight: 300;
font-size: 1.25vw;
line-height: 1.25vw;
text-align: left;
color: #fff;
padding: 1vw 1.5vw;
position: absolute;
transition-timing-function: ease-in;
transition-duration: 500ms ;
transition-delay: .2s;
opacity: 0;
@media(max-width: ${variables.medium}){
    font-size: 5vw;
    line-height: 6vw;
    padding: 3vw 5vw;
    top: 22vw;
    padding: 3vw 5vw;
}
`;

const mapStateToProps = state => {
    return {
        projects: {
            projectData: state.projects.projectData,
            filteredData: state.projects.filteredData,
            sortBy: state.projects.sortBy,
            activeButton: state.projects.activeButton
        },
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
                                height: calc(${projectEntry.cardHeight}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                position: relative;
                                top:${projectEntry.cardHeight * (projectEntry.imagePositionTop / 100)}px;
                                left: calc(${projectEntry.imagePositionLeft}% / 2);
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${projectEntry.cardColor};
                                transition: 150ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 5vw);
                                margin: 0 2.5vw;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                 ${CardTitle} {
                                    top: ${projectEntry.cardHeight / 6}px;
                                }
                                ${CardBlurb} {
                                    top: ${projectEntry.cardHeight / 2}px;
                                }
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
                                }
                                 @media(max-width: ${variables.medium}){
                                    width: calc(100% - 5vw);
                                }
                                `;
                        let clientSlug = projectEntry.client;
                        clientSlug = clientSlug
                            .replace(/\s+/g, '-');
                        const card = <MasonryBlogCard key={projectEntry.id} className="grid-item">
                            <Link to={`project/${clientSlug}`}>
                                <FadeInWhenVisibleOpacity>
                                    <ContainerDiv>
                                        <Row>
                                            <FittedImage className='styledImage' src={projectEntry.cardImage.publicUrl} />
                                        </Row>
                                    </ContainerDiv>
                                    <CardTextRow>
                                        <CardTitle className='styledTitle' xs={12}>{projectEntry.client}</CardTitle>
                                        <CardBlurb className='styledBlurb' xs={12}>{projectEntry.title}</CardBlurb>
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
                        let url = projectEntry.url;

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${projectEntry.cardHeight}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                position: relative;
                                top:${projectEntry.cardHeight * (projectEntry.imagePositionTop / 100)}px;
                                left: calc(${projectEntry.imagePositionLeft}% / 2);
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${projectEntry.cardColor};
                                transition: 500ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 5vw);
                                margin: 0 2.5vw;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                 ${CardTitle} {
                                    top: ${projectEntry.cardHeight / 6}px;
                                }
                                ${CardBlurb} {
                                    top: ${projectEntry.cardHeight / 2}px;
                                }
                                &:hover, &:focus {
                                    ${ContainerDiv} {
                                    filter: blur(2px) brightness(60%);
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
                                }
                                 @media(max-width: ${variables.medium}){
                                    width: calc(100% - 5vw);
                                }
                                `;
                        let clientSlug = projectEntry.client;
                        clientSlug = clientSlug
                            .replace(/\s+/g, '-');
                        const card = <MasonryBlogCard key={projectEntry.id}  className="grid-item">
                            <Link to={`project/${clientSlug}`}>
                                <FadeInWhenVisibleOpacity>
                                    <ContainerDiv>
                                        <Row>
                                            <FittedImage className='styledImage' src={projectEntry.cardImage.publicUrl} />
                                        </Row>
                                    </ContainerDiv>
                                    <CardTextRow>
                                        <CardTitle className='styledTitle' xs={12}>{projectEntry.client}</CardTitle>
                                        <CardBlurb className='styledBlurb' xs={12}>{projectEntry.title}</CardBlurb>
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
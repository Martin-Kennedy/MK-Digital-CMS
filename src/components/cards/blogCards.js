import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import styled from 'styled-components';
import variables from '../../variables.module.scss';
import Masonry from 'react-masonry-component';
import {connect} from 'react-redux';
import {generateHsl} from '../../helpers/utilities';
import {FadeInWhenVisibleOpacity} from '../../helpers/fadeInOnViewport';
import Spinner from 'react-bootstrap/spinner';
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
        blogs: {
            blogData: state.blogs.blogData,
            filteredData: state.blogs.filteredData,
            sortBy: state.blogs.sortBy,
            activeButton: state.blogs.activeButton
        }
    }
};

class FilteredCards extends Component {
    constructor() {
        super()
    }
    render() {
        return (
           <div>
               
          
            <MasonryBlog
                elementType={'div'}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}>

                {this
                    .props
                    .blogs
                    .filteredData
                    .map((blogEntry, index) => {
                        let id = blogEntry.id;
                        

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${blogEntry.cardHeight}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                position: relative;
                                 top:${blogEntry.cardHeight * (blogEntry.imagePositionTop / 100)}px;
                                left: calc(${blogEntry.imagePositionLeft}% / 2);
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${blogEntry.cardColor};
                                transition: 500ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 50px);
                                margin: 20px;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                    z-index: 2;
                                      ${CardTitle} {
                                    top: ${blogEntry.cardHeight / 6}px;
                                }
                                ${CardBlurb} {
                                    top: ${blogEntry.cardHeight / 2}px;
                                }
                                 @media(max-width: ${variables.medium}){
                                    width: calc(100% - 5vw);
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
                                }`;
                        let titleSlug = blogEntry.title;
                        titleSlug = titleSlug
                            .replace(/\s+/g, '-');
                        const card = <MasonryBlogCard key={id} className="grid-item">
                            <Link to={`blog/${titleSlug}`}>
                                <FadeInWhenVisibleOpacity>
                                    <ContainerDiv>
                                        <Row>
                                            <FittedImage className='styledImage' src={blogEntry.cardImage.publicUrl} />
                                        </Row>
                                    </ContainerDiv>
                                    <CardTextRow>
                                        <CardTitle className='styledTitle' xs={12}>{blogEntry.title}</CardTitle>
                                    </CardTextRow>
                                </FadeInWhenVisibleOpacity>
                            </Link>
                        </MasonryBlogCard>

                        return card;

                    })}
            </MasonryBlog>
            </div>

        )
    }
}

class UnfilteredCards extends Component {
    constructor(){
        super()
        
    }
    render() {
        return (
            <div>

           
            <MasonryBlog
                elementType={'div'}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}>

                {this
                    .props
                    .blogs
                    .blogData
                    .map((blogEntry, index) => {
                        let id = blogEntry.id;
                        

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${blogEntry.cardHeight}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
                                position: relative;
                                top:${blogEntry.cardHeight * (blogEntry.imagePositionTop / 100)}px;
                                left: calc(${blogEntry.imagePositionLeft}% / 2);
                                `;

                        const ContainerDiv = styled.div`
                                background-color: ${blogEntry.cardColor};
                                transition: 500ms ease-in;
                                margin-top: 20px;
                                `;
                        const MasonryBlogCard = styled(Card)`
                                width: calc(33.33% - 50px);
                                margin: 20px;
                                padding: 0;
                                margin-bottom: 0;
                                border: none;
                                    z-index: 2;
                                      ${CardTitle} {
                                    top: ${blogEntry.cardHeight / 6}px;
                                }
                                ${CardBlurb} {
                                    top: ${blogEntry.cardHeight / 2}px;
                                }
                                 @media(max-width: ${variables.medium}){
                                    width: calc(100% - 5vw);
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
                                }`;
                        let titleSlug = blogEntry.title;
                        titleSlug = titleSlug
                            .replace(/\s+/g, '-');
                        const card = <MasonryBlogCard key={id} className="grid-item">
                            <Link to={`blog/${titleSlug}`}>
                                <FadeInWhenVisibleOpacity>
                                    <ContainerDiv>
                                        <Row>
                                            <FittedImage className='styledImage' src={blogEntry.cardImage.publicUrl} />
                                        </Row>
                                    </ContainerDiv>
                                    <CardTextRow>
                                        <CardTitle className='styledTitle' xs={12}>{blogEntry.title}</CardTitle>
                                    </CardTextRow>
                                </FadeInWhenVisibleOpacity>
                            </Link>
                        </MasonryBlogCard>

                        return card;

                    })}
            </MasonryBlog>
            </div>
        )
    }
}

export const FilteredCardsContainer = connect(mapStateToProps)(FilteredCards);
export const UnfilteredCardsContainer = connect(mapStateToProps)(UnfilteredCards);
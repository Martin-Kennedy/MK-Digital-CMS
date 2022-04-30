import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import styled from 'styled-components';
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

const StyledSpinner = styled(Spinner)`
position: absolute;
top: 115vh;
left: calc(50vw - 50px);
width: 100px;
height: 100px;
z-index: 3;
transition: 1.25s ease-in-out;
`


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
        this.state = {
            hideSpinner: false
        }
    }
    render() {
        return (
           <div>
               <StyledSpinner className={this.state.hideSpinner ? 'hidden' : null} animation="border" ></StyledSpinner>
          
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
                        if (this.props.blogs.blogData.length - 1 === index) {
                            this.state.hideSpinner = true;
                        } 

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${blogEntry.height}px - 20px);
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
                                z-index: 2;
                                border: none;
                                background-color: tranparent;
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
                                        <FittedImage className='styledImage' src={blogEntry.blogCardImage} />
                                    </Row>
                                </ContainerDiv>
                                <CardTextRow>
                                    <CardTitle className='styledTitle' xs={12}>{blogEntry.title}</CardTitle>
                                    <CardBlurb className='styledBlurb' xs={12}>{blogEntry.blurb}</CardBlurb>
                                </CardTextRow>
                            </FadeInWhenVisibleOpacity>
                        </MasonryBlogCard>;




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
        this.state = {
            hideSpinner: false
        }
    }
    render() {
        return (
            <div>

            <StyledSpinner className={this.state.hideSpinner ? 'hidden' : null} animation="border" ></StyledSpinner>
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
                        if(this.props.blogs.blogData.length - 1 === index){
                            this.state.hideSpinner = true;
                        } 

                        const FittedImage = styled.img`
                                max-width: calc(100% - 20px);
                                height: calc(${blogEntry.height}px - 20px);
                                object-fit: contain;
                                transition: 500ms ease-in;
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
                                        <CardBlurb className='styledBlurb' xs={12}>{blogEntry.article}</CardBlurb>
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
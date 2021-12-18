import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { generateHsl } from '../helpers/utilities';
import FilterButtons from './filterButtons';

let dynamicStylesPositionTop = [];

const MasonryBlog = styled(Masonry)`
width: 80%;
margin-left: auto;
margin-right: auto;
padding: 0;
`;

const StampLi = styled.li`
width: calc(100% - 1rem);
margin: 0rem;
padding: 0rem;
margin-bottom: 20px;
height: 250px;


@media (max-width: 700px) {
display: none;
}

@media (min-width: 700px) {
width: calc(100% / 2 - 1rem);
margin-left: 0.5rem;
margin-right: 0.5rem;
}
@media (min-width: 1200px) {
width: calc(100% / 2 - 1rem);
margin-left: 0.5rem;
margin-right: 0.5rem;
}
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
top: 10px;
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
top: 60px;
transition: 500ms ease-in;
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
    render(){
        return (<MasonryBlog
            elementType={'ul'}
            disableImagesLoaded={false}
            updateOnEachImageLoad={true}>

            <StampLi ></StampLi>
    {this.props
    .blogs
    .filteredData
    .map((blogEntry) => {
        let id = blogEntry.id;
        const ContainerDiv = styled.div `
                    background-color: ${generateHsl()};
                    height: ${blogEntry.height + 100}px;
                    box-shadow: -3px 3px 2px rgba(0,0,0, .3);
                    transition: 500ms ease-in;
                    &:hover, &:focus  {
                        filter: brightness(90%);
                        cursor: pointer;
                    }
                    &:hover .styledImage {
                        transform: scale(.97);
                    }
                    &:hover .styledTitle {
                        opacity: 1; 
                    }
                    &:hover .styledBlurb {
                        opacity: 1;
                    }
                    
                        
                `;
        const MasonryBlogLi = styled.li `
                width: calc(100% - 1rem);
                margin: 0rem;
                padding: 0rem;
                margin-bottom: ${blogEntry.height * .5}px;
                
                @media (min-width: 700px) {
                    width: calc(100% / 2 - 1rem);
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                }
                @media (min-width: 1200px) {
                    width: calc(100% / 2 - 1rem);
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                }
                `;
        const FittedImage = styled.img `
                width: 50%;
                height: auto;
                max-height: ${blogEntry.height - 100}px;
                object-fit: contain;
                position: relative;
                top: ${blogEntry.positionTop}%;
                left: ${blogEntry.positionLeft}%;
                transition: 500ms ease-in;
                `;

        const card = <MasonryBlogLi key={id}>
            <ContainerDiv>
                <Row>
                    <Col ><FittedImage className='styledImage' src={blogEntry.blogCardImage}/></Col>
                </Row>
                <CardTextRow>
                    <CardTitle className='styledTitle' xs={12}>{blogEntry.title}</CardTitle>
                    <CardBlurb className='styledBlurb' xs={12}>{blogEntry.blurb}</CardBlurb>
                </CardTextRow>
            </ContainerDiv>
        </MasonryBlogLi>;
        return card;
    })}
        </MasonryBlog>)}
}

export default connect(mapStateToProps)(FilteredCards);
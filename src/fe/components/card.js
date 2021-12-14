import React from 'react';
import {Image, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import {connect} from 'react-redux';
import {useMediaQuery} from '../helpers/hooks';
import { generateHsl} from '../helpers/utilities';


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
bottom: 100px;
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
bottom: 10px;
transition: 500ms ease-in;
opacity: 0;
`;



const mapStateToProps = state => {
    return {blogData: state.blogs.blogData};
};







const buildCardArray = (blogProp) => {

    const cardArray = <MasonryBlog 
                    elementType={'ul'} // default 'div' // default {}
                    disableImagesLoaded={false} 
                    updateOnEachImageLoad={false}>
            
                    <StampLi >
                    </StampLi>

        {blogProp
            .blogData
            .map((blogEntry) =>
            // Correct! Key should be specified inside the array.
            {

                let id = blogEntry.id;
                const ContainerDiv = styled.div`
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
                const FittedImage = styled.img`
                width: 50%;
                height: auto;
                max-height: ${blogEntry.height - 100}px;
                object-fit: contain;
                position: relative;
                top: ${blogEntry.positionTop}%;
                left: ${blogEntry.positionLeft}%;
                transition: 500ms ease-in;
                `;

                const card =  <MasonryBlogLi key={id}>
                        <ContainerDiv >
                            <Row>
                                <Col ><FittedImage className='styledImage' src={blogEntry.blogCardImage} /></Col>
                            </Row>
                            <CardTextRow>
                            <CardTitle className='styledTitle' xs={12}>{blogEntry.title}</CardTitle>
                            <CardBlurb className='styledBlurb' xs={12}>{blogEntry.blurb}</CardBlurb>
                            </CardTextRow>
                    </ContainerDiv>
                    </MasonryBlogLi>;
                return card;
            })}
    </MasonryBlog>
    return cardArray;
}

const BlogCard = (blogProp) => (
    <div>
        {Array.isArray(blogProp.blogData)
            ? buildCardArray(blogProp)
            : null}
    </div>
)

export default connect(mapStateToProps)(BlogCard);
import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import {connect} from 'react-redux';

const MasonryBlog = styled(Masonry)`
width: 80%;
margin-left: auto;
margin-right: auto;
padding: 0;
`;

const MasonryBlogLi = styled.li`
  width: calc(100% / 2 - 1rem);
  margin: 0.5rem;
  padding: 1rem;


@media (min-width: 700px) {
    width: calc(100% / 3 - 1rem);
    margin: 0.5rem;
  }
@media (min-width: 1200px) {
    width: calc(100% / 4 - 1rem);
    margin: 0.5rem;
}
`;


const mapStateToProps = state => {
    return { blogData: state.blogs.blogData};
};

const buildCardArray = (blogProp) => {
    const cardArray = <MasonryBlog
        elementType={'ul'} // default 'div' // default {}
        disableImagesLoaded={false} 
        updateOnEachImageLoad={false} 
    >
     
    {blogProp
        .blogData
        .map((blogEntry) =>
        // Correct! Key should be specified inside the array.
        {
            const dynamicStyles = {
                backgroundColor: blogEntry.bkgColor,
                height: `${blogEntry.height}px`
            };
            const card = 
                <MasonryBlogLi key={blogEntry.id}>

                <div style={dynamicStyles}>
                    <Row>
                        <Col >{blogEntry.first_name}</Col>
                    </Row>
                    <Row>
                        <Col>{blogEntry.last_name}</Col>
                    </Row>
                    <Row></Row>
                </div>
                </MasonryBlogLi>
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
import React from 'react';
import {Image, Row, Col} from 'react-bootstrap';
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
  margin: 0rem;
  padding: 0rem;
  border-radius: 1rem;
  box-shadow: -3px 3px 2px rgba(0,0,0, .3);
  
@media (min-width: 700px) {
    width: calc(100% / 3 - 1rem);
    margin: 0.5rem;
  }
@media (min-width: 1200px) {
    width: calc(100% / 4 - 1rem);
    margin: 0.5rem;
}
`;

const FittedImage = styled(Image)`
width: 100%;
height: auto;
border-radius: 1rem 1rem 0px 0px;
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
width: calc(100% - 20px)

`;

const CardBlurb = styled(Col)`
font-weight: 300;
font-size: .8rem;
text-align: left;
color: #fff;
padding: 10px;
`;


const mapStateToProps = state => {
    return { blogData: state.blogs.blogData};
};

const hexToRgbA = (hex) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.75)';
    }
    throw new Error('Bad Hex');
}



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
                backgroundColor: hexToRgbA(blogEntry.bkgColor),
                height: `${blogEntry.height * 1.5}px`,
                borderRadius: '1rem',
            };
            const card = 
                <MasonryBlogLi key={blogEntry.id}>

                <div style={dynamicStyles}>
                    <Row>
                            <Col ><FittedImage src={blogEntry.blogCardImage} fluid /></Col>
                    </Row>
                        <CardTextRow>
                            <CardTitle>{blogEntry.title}</CardTitle>
                        </CardTextRow>
                        <CardTextRow>
                            <CardBlurb>{blogEntry.blurb}</CardBlurb>
                        </CardTextRow>
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
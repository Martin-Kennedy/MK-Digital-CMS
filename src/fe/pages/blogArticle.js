import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import { SmallAndThinText } from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import { FadeInWhenVisibleOpacity, FadeInWhenVisibleScale } from '../helpers/fadeInOnViewport';
import { LineAnimationL2R } from '../components/designElementComponents/lineSvg';
import { connect } from 'react-redux';
import { getBlogItem, getNextBlogItem } from '../actions/blogs.actions';
import { Waypoint } from 'react-waypoint';
import { getIntersectingState } from '../actions/pages.actions';

const BaseLayer = styled.div`
    background-color: var(--white);
`

const IntroSection = styled(Row)`
    background-color: var(--white);
    min-height: 500px;
    color: var(--black);
    z-index: 1;
    position: relative;
    margin-top: 150px;

`;

const IntroBlurb1 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 17px;
    padding-left: 40px;
    margin-right: 30px;
    div:first-child {
        margin-bottom: 1.5rem;
    }
`
const IntroBlurb2 = styled.h2`
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    font-weight: 200;
    font-size: 17px;
    margin-left: 30px;
    div:first-child {
        margin-bottom: 1.5rem;
    }
`

const Img = styled.img`
    height: 50vh;
    width: 100%;
    object-fit: contain;
    margin-top: 5%;
 `
const Section = styled(Row)`
min-height: 1000px;
height: 100%;
background-color: var(--white);
`

const HeroImgSection = styled(Section)`
height: 60vh;
min-height: 0;
margin-bottom: 10vh;
`
const ImgBkg = styled.div`
width: 100%;
height: 100%;
background-color: ${props => props.bkgColor};
`

const Title = styled.div`
font-size: 50px;
color: var(--black);
letter-spacing: 2px;
margin-left: 0;
padding-left: 0;
`

const TopLine = styled.div`
position: relative;
top: -20px;
left: -30px;
svg{
    stroke: var(--black);
}
`

const BlogArticleFooter = styled(Row)`
height: 120px;
 align-content: center;
`

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            nextBlogItem: state.blogs.nextBlogItem,
            nextBlogItemPathname: state.blogs.nextBlogItemPathname,
            blogItem: state.blogs.blogItem,
            isIntersecting: state.pages.isIntersecting
        }
    }
};

class BlogPage extends Component {

    constructor() {
        super();
        this.state = {
            titleSlug: null
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.blogs.blogData !== this.props.blogs.blogData) {
            
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug
                .replace(/-/g, ' ')
                .replace(/_/g, ' ');

            console.log(revertedTitle)
            this
                .props
                .dispatch(getBlogItem(revertedTitle));

        }
        this.props.dispatch(getNextBlogItem(this.props.blogs.blogItem.id + 1))


    }

    getFirstPathSegment(props) {
        return props.split('/')[1];

    }

    




    render() {
        let item = this.props.blogs.blogItem[0];

        return (
            <div>
                {this.props.blogs.blogItem.length
                    ? <BaseLayer>
                        <HeaderComponent
                            location={this.getFirstPathSegment(this.props.location.pathname)} />
                   

                            <IntroSection >
                                <Col xs={2}></Col>
                                <Col xs={8}>
                                <HeroImgSection><ImgBkg bkgColor={item.bkgColor}><FadeInWhenVisibleOpacity duration={2}><Img src={item.blogCardImage} /></FadeInWhenVisibleOpacity></ImgBkg></HeroImgSection>
                                    <Row>
                                        <FadeInWhenVisibleOpacity duration={2}>
                                            <Title>{item.title}</Title>
                                        </FadeInWhenVisibleOpacity>
                                    </Row>
                                    <Row>
                                        <Col xs={10}><TopLine><LineAnimationL2R/></TopLine></Col>
                                        <Col xs={2}>
                                        <FadeInWhenVisibleScale duration={1}>
                                            <SmallAndThinText>Oct 2, 2021</SmallAndThinText>
                                        </FadeInWhenVisibleScale>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>{item.article}</p>
                                    </Row>
                              
                                <Row>
                                        <Link to={this.props.blogs.nextBlogItemPathname}><p>{this.props.blogs.nextBlogItem.title}</p></Link>
                                </Row>
                                </Col>
                                <Col xs={2}></Col>
                            </IntroSection>
                        
                       

                      

                      <BlogArticleFooter>
                            <Footer />
                        </BlogArticleFooter>
                        

                    </BaseLayer>
                    : 'loading'
                }
            </div>
        )

    }
}



export default connect(mapStateToProps)(BlogPage);
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import {SmallAndThinText, Main} from '../helpers/commonStyledComponents';
import HeaderComponent from '../components/navigation/header';
import Footer from '../components/footer';
import {FadeInWhenVisibleOpacity, FadeInWhenVisibleScale} from '../helpers/fadeInOnViewport';
import {LineAnimationL2R, LineAnimationR2L} from '../components/designElementComponents/lineSvg';
import {connect} from 'react-redux';
import {getBlogItem, getNextBlogItem, getBlogs} from '../actions/blogs.actions';
import {getToken, establishSession} from '../actions/initialUtility.actions';
import {Waypoint} from 'react-waypoint';
import {getIntersectingState} from '../actions/pages.actions';
import variables from '../variables.module.scss';
import DOMPurify from 'dompurify';

const BaseLayer = styled.div `
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

const BlogMain = styled(Main)`
p {
    font-size: 1.25vw;
    line-height: 1.5vw;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    letter-spacing: .125vw;
    padding-right: 5vw;
     @media(max-width: ${variables.medium}){
    font-size: 3vw;
    line-height: 4vw;
    letter-spacing: .35vw;

}
    @media(max-width: ${variables.small}){
    font-size: 5vw;
    line-height: 6vw;
    letter-spacing: .5vw;

}
}

`
const Img = styled.img `
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
const ImgBkg = styled.div `
width: 100%;
height: 100%;
background-color: ${props => props.bkgColor};
`

const Title = styled.div `
font-size: 50px;
color: var(--black);
letter-spacing: 2px;
margin-left: 0;
padding-left: 0;
`

const TopLine = styled.div `
position: relative;
top: -20px;
left: -30px;
svg{
    stroke: var(--black);
}
`

const BottomLine = styled.div `
    width: calc(95% - 20vw);
    /* padding-bottom: 19px; */
    position: relative;
    top: -7px;
    margin-right: 5%;
svg{
    stroke: var(--black);
}
`
const NextArticle = styled.div `
color: var(--black);
margin-top: 30px;
font-size: 14px;
font-weight: 200;
display: flex;
width: 100%;
a {
    width: 20vw;
    white-space: nowrap;
}
`

const BlogArticleFooter = styled(Row)`
height: 120px;
 align-content: center;
`

const mapStateToProps = state => {
    return {
        initialUtility: {
            keystoneToken: state.initialUtility.keystoneToken,
            session: state.initialUtility.session
        },
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

        if (this.props.initialUtility.session === true) {
            if (!this.props.blogs.blogData.length) {
                this
                    .props
                    .dispatch(getBlogs(this.props.initialUtility.keystoneToken))
            }
        } else {
            if (this.props.initialUtility.keystoneToken === null) {
                this
                    .props
                    .dispatch(getToken())
            } else {
                this
                    .props
                    .dispatch(establishSession(this.props.initialUtility.keystoneToken))
            }
        }

        if (prevProps.blogs.blogData !== this.props.blogs.blogData) {

            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug
                .replace(/-/g, ' ')
                .replace(/_/g, ' ');
            this
                .props
                .dispatch(getBlogItem(revertedTitle, this.props.initialUtility.keystoneToken));

        }
        if (prevProps.blogs.blogItem !== this.props.blogs.blogItem) {
            console.log(this.props.blogs.blogItem[0].title);
            const result = this
                .props
                .blogs
                .blogData
                .filter(blog => {
                    return blog.title === this.props.blogs.blogItem[0].title;
                });
            console.log(result)
            const nextBlog = this
                .props
                .blogs
                .blogData
                .filter(blog => {
                    return result[0].orderNum + 1 === blog.orderNum;
                });
            console.log(nextBlog)
            nextBlog.length
                ? this
                    .props
                    .dispatch(getNextBlogItem(nextBlog[0].title))
                : this
                    .props
                    .dispatch(getNextBlogItem(this.props.blogs.blogData[0].title));

        }

    }

    getFirstPathSegment(props) {
        return props.split('/')[1];

    }

    restructureDate(item) {
        let publishDateObj = new Date(item.publishDate);
        return `${publishDateObj.toLocaleString('default', {
            month: 'short'})} ${publishDateObj.getDate()}, ${publishDateObj.getFullYear()}`;
        }

        sanitizeHTML(itemToClean) {
            const clean = DOMPurify.sanitize(itemToClean);
            return clean;
        }

        render() {
            let item = this.props.blogs.blogItem[0];

            return (
                <div>
                    {this.props.blogs.blogItem.length
                        ? <BaseLayer>
                                <HeaderComponent
                                    location={this.getFirstPathSegment(this.props.location.pathname)}/>

                                <IntroSection >
                                    <Col xs={2}></Col>
                                    <Col xs={8}>
                                        <HeroImgSection>
                                            <ImgBkg bkgColor={item.imageBkgColor}>
                                                <FadeInWhenVisibleOpacity duration={2}><Img src={item.mainImage.publicUrl}/></FadeInWhenVisibleOpacity>
                                            </ImgBkg>
                                        </HeroImgSection>
                                        <Row>
                                            <FadeInWhenVisibleOpacity duration={2}>
                                                <Title>{item.title}</Title>
                                            </FadeInWhenVisibleOpacity>
                                        </Row>
                                        <Row>
                                            <Col xs={2}>
                                                <FadeInWhenVisibleScale duration={1}>
                                                    <SmallAndThinText>{this.restructureDate(item)}</SmallAndThinText>
                                                </FadeInWhenVisibleScale>
                                            </Col>
                                            <Col xs={10}>
                                                <TopLine><LineAnimationR2L/></TopLine>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <BlogMain
                                                dangerouslySetInnerHTML={{
                                                __html: this.sanitizeHTML(item.article)
                                            }}></BlogMain>
                                        </Row>
                                        <Waypoint
                                            onEnter={() => {
                                            this
                                                .props
                                                .dispatch(getIntersectingState(true))
                                        }}
                                            onLeave={() => {
                                            this
                                                .props
                                                .dispatch(getIntersectingState(false))
                                        }}>

                                            <NextArticle>
                                                <BottomLine><LineAnimationL2R/></BottomLine>
                                                <Link
                                                    to={this.props.blogs.nextBlogItemPathname}
                                                    className="btn-flip"
                                                    data-back={this.props.blogs.nextBlogItem}
                                                    data-front="NEXT ARTICLE"></Link>
                                            </NextArticle>
                                        </Waypoint>
                                    </Col>
                                    <Col xs={2}></Col>
                                </IntroSection>

                                <BlogArticleFooter>
                                <Footer location={this.props.location.pathname} />
                                </BlogArticleFooter>

                            </BaseLayer>
                        : 'loading'
}
                </div>
            )

        }
    }

    export default connect(mapStateToProps)(BlogPage);
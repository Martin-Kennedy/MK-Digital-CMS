import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import variables from '../variables.module.scss';
import { Main } from '../helpers/commonStyledComponents';
import styled from 'styled-components';
import BlogCardsContainer from '../components/cards/blogCardContainer';
import HeaderComponent from '../components/navigation/header';
import {getToken, establishSession} from '../actions/initialUtility.actions';
import {getBlogLanding} from '../actions/blogs.actions';
import Footer from '../components/footer';

const TopRow = styled(Row)`
padding-top: 120px;
`

const Paragraph = styled.p`
font-size: 2vw;
line-height: 3vw;
margin:0;
padding: 0;
word-wrap: none;
 @media(max-width:${variables.medium}){
        font-size: 5vw;
    }
`

const Hero = styled(Col)`
min-height: calc(60vh - 120px);
padding-top: 60px;
padding-bottom: 60px;
`

const H1 = styled.h1`
    font-size: 5vw;
    font-weight: 500;
    padding-left: 0;
     @media(max-width:${variables.medium}){
        font-size: 18vw;
    }
`
const BlogLandingMain = styled(Main)`
margin: 0 2vw;
padding: 0;
`

const BlogLandingFooter = styled(Col)`
padding: 20vh 6vw 10vh 3vw;
`

const mapStateToProps = state => {
    return {
        initialUtility: {
            keystoneToken: state.initialUtility.keystoneToken,
            session: state.initialUtility.session
        },
        blogs: {
            blogLandingData: state.blogs.blogLandingData
        }
    }
}

const BlogLanding = (props) => {
    useEffect(() => {
        if (props.initialUtility.session === true) {
            if (!props.blogs.blogLandingData.length) {
                props.dispatch(getBlogLanding(props.initialUtility.keystoneToken))
            }
        } else {
            if (props.initialUtility.keystoneToken === null) {
                props.dispatch(getToken())
            } else {
                props.dispatch(establishSession(props.initialUtility.keystoneToken))
            }
        }
    })
    return <div>
        <HeaderComponent location={props.location.pathname}/>
        <TopRow>
            <Col xs={2} sm={1}></Col>
            <Hero xs={8} sm={10}>
                {props.blogs.blogLandingData.length && <BlogLandingMain>

                        <H1>{props.blogs.blogLandingData[0].h1}</H1>
                    <Paragraph>{props.blogs.blogLandingData[0].paragraph}</Paragraph>

                </BlogLandingMain>}
            </Hero>
            <Col xs={2} sm={1}></Col>
        </TopRow>
        {/* Above the Fold Text and CTA */}
        <Row>
            <Col xs={2} sm={1}></Col>
            <Col xs={8} sm={10}>
                <BlogCardsContainer/>
            </Col>
            <Col xs={2} sm={1}></Col>

        </Row>

        <Row>
            <Col xs={2} sm={1}></Col>
            <BlogLandingFooter xs={8} sm={10}>
                <Footer location={props.location.pathname} />
            </BlogLandingFooter>
            <Col xs={2} sm={1}></Col>
        </Row>

    </div>

}

export default connect(mapStateToProps)(BlogLanding);

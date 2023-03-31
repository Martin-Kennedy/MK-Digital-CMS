import React, { useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HeaderComponent from '../components/navigation/header';
import {ContactForm} from '../components/forms/contactForm';
import styled from 'styled-components';
import Footer from '../components/footer';
import Loading from '../components/loadingComponent';
import {H1, H2, Line} from '../helpers/commonStyledComponents';
import {getContact} from '../actions/contact.actions';
import {establishSession, getToken} from '../actions/initialUtility.actions';

const BaseLayer = styled.div `
    background-color: var(--white);
    min-height: 100vh;
`
const ContactFormContainer = styled.div `
height: 100vh;
`

const ContactH2 = styled(H2)`
margin-bottom: 6vh;
@media(max-width: 768px){
    font-size: 5vw;
    line-height: 7vw;
}
`

const ContactLine = styled(Line)`
margin-bottom: 2vh;
`

const TopRow = styled(Row)`
margin-top: calc(10vh + 100px);
`

const TopCol = styled(Col)`
margin: 0 1vw;
`

const ContactFooter = styled(Col)`
padding: 10vh 4vw 10vh 2vw;
`

const ContactH1 = styled(H1)`
@media(max-width: 768px){
    font-size: 10vw;
    line-height: 12vw;
}
`



const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
        },

        contact: {
            contactData: state.contact.contactData
        }
    }
};

const ContactPage = (props) => {
  
    useEffect(() => {
       let _isMounted = true;
        window.onpopstate = () => {
            if (_isMounted) {
                const {hash} = location;
                if (hash.indexOf('home') > -1 && this.state.value !== 0) 
                    this.setState({value: 0})
                if (hash.indexOf('users') > -1 && this.state.value !== 1) 
                    this.setState({value: 1})
                if (hash.indexOf('data') > -1 && this.state.value !== 2) 
                    this.setState({value: 2})
            }
        }
        if (props.initialUtility.session === true) {
            if (!props.contact.contactData.length) {
                props
                    .dispatch(getContact(props.initialUtility.keystoneToken))
            }
        } else {
            if (props.initialUtility.keystoneToken === null) {
               props
                    .dispatch(getToken())
            } else {
                props
                    .dispatch(establishSession(props.initialUtility.keystoneToken))
            }
        }
    }
    )

        return (
            <BaseLayer>
                <HeaderComponent location={props.location.pathname}/>
                <TopRow>
                    <Col xs={2}></Col>

                    {props.contact.contactData.length
                        ? <TopCol>
                                <ContactH1>
                                    {props.contact.contactData[0].h1}
                                </ContactH1>
                                <ContactH2>
                                    {props.contact.contactData[0].h2}
                                </ContactH2>
                                <ContactLine></ContactLine>
                            </TopCol>
                        : null}
                    <Col xs={2}></Col>
                </TopRow>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                        <ContactFormContainer>
                            <ContactForm/>
                        </ContactFormContainer>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <ContactFooter xs={8}>
                        <Footer location={props.location.pathname}/>
                    </ContactFooter>
                    <Col xs={2}></Col>
                </Row>

            </BaseLayer>

        )
}

export default connect(mapStateToProps)(ContactPage);
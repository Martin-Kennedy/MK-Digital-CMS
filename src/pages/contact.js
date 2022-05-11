import React, {Fragment, Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HeaderComponent from '../components/navigation/header';
import {ContactForm} from '../components/forms/contactForm';
import styled from 'styled-components';
import Footer from '../components/footer';
import { H1, H2, Line } from '../helpers/commonStyledComponents';
import { getContact } from '../actions/contact.actions';
import { establishSession, getToken } from '../actions/initialUtility.actions';

const BaseLayer = styled.div `
    background-color: var(--white);
    min-height: 100vh;
`
const ContactFormContainer = styled.div `
height: 100vh;
`

const ContactH2 = styled(H2)`
margin-bottom: 6vh;
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

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken,
        },

        contact: {
            contactData: state.contact.contactData
        }
    }
};

 class ContactPage extends Component {
    constructor() {
        super();
        this.state = {}
    }

     componentDidUpdate(prevProps) {

         if (this.props.initialUtility.session === true) {
             if (!this.props.contact.contactData.length) {
                 this.props.dispatch(getContact(this.props.initialUtility.keystoneToken))
             }
         } else {
             if (this.props.initialUtility.keystoneToken === null) {
                 this.props.dispatch(getToken())
             } else {
                 this.props.dispatch(establishSession(this.props.initialUtility.keystoneToken))
             }
         }

     }

    render() {
        return (
            <BaseLayer>
            {console.log(this.props)}
                <HeaderComponent location={this.props.location.pathname}/>
                <TopRow>
                    <Col xs={2}></Col>
                    
                    {this.props.contact.contactData.length ? 
                    <TopCol>
                    <H1>
                    {this.props.contact.contactData[0].h1}
                    </H1>
                            <ContactH2>
                    {this.props.contact.contactData[0].h2}
                            </ContactH2>
                            <ContactLine></ContactLine>
                    </TopCol>
                    : null }
                    <Col xs={2}></Col>
                </TopRow>
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                        <ContactFormContainer>
                            <ContactForm/>
                        </ContactFormContainer>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Footer/>
            </BaseLayer>

        )
    }
}

export default connect(mapStateToProps)(ContactPage);
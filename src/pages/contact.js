import React, {Fragment, Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import HeaderComponent from '../components/navigation/header';
import {ContactForm} from '../components/forms/contactForm';
import styled from 'styled-components';
import Footer from '../components/footer';

const BaseLayer = styled.div `
    background-color: var(--white);
    
    min-height: 100vh;

`
const ContactFormContainer = styled.div `
height: 100vh;
margin-top: 20vh;
`

export default class ContactPage extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <BaseLayer>
                <HeaderComponent location={this.props.location.pathname}/>
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
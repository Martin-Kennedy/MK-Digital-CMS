import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import {sendForm} from 'emailjs-com';
import {Row, Col} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import variables from '../..//variables.module.scss';


const FormRow = styled(Row)`
margin-top: 5vh;
@media(max-width: 768px){
    margin-top: 0;
}
`

const FormInput = styled.input `
padding: 1vw;
width: calc(50% - 2vw);
margin: 0 1vw;
height: 4vw;
font-size: 1.5vw;
placeholder:: {
color: var(--black);
opacity: .7;
}
color: var(--black);
border: 1px solid var(--black);
@media(max-width: 768px){
    width: calc(100% - 2vw);
    height: 6vh;
    font-size: 3vw;
    margin-top: 3vh;
}
`
const FormTextArea = styled.textarea `
padding: 1vw;
width: calc(100% - 2vw);
margin: 0 1vw;
height: 4vw;
font-size: 1.5vw;
placeholder:: {
color: var(--black);
opacity: .7;
}
color: var(--black);
border: 1px solid #aaa;
@media(max-width: 768px){
    height: 30vh;
    font-size: 3vw;
    margin-top: 5vh;
}
`

const FormSelect = styled.select `
padding: 1vw;
width: calc(50% - 2vw);
margin: 0 1vw;
height: 4vw;
font-size: 1.5vw;
&:required:invalid {
color: var(--black);
opacity: .7;
}
color: var(--black);
border: 1px solid var(--black);
@media(max-width: 768px){
    width: calc(100% - 2vw);
    height: 6vh;
    font-size: 3vw;
    margin-top: 3vh;
}
`
const SubmitCol = styled(Col)`
flex-wrap: nowrap;
`
const StyledReCAPTCHA = styled(ReCAPTCHA)`
margin: 0 1vw;
width: calc(100% - 15vw);
@media(max-width: 768px){
    margin-top: 5vh;
}
`

const ContactFormButton = styled.button`
display: flex;
font-size: 14px;
font-weight: 500;
width: 10vw;
background-color: transparent;
color: #000;
border: 0;
transition: .5s ease;
padding: 0;
margin: 0 15px;
transform-style: preserve-3d;
transform: translateZ(-25px);
transition: transform 0.3s;
position: relative;
margin-top: 40px;
@media(max-width: 768px){
    width: 50vw;

}



&:first-child {
    margin-left: 0;
}

&:hover, &:focus {
    color: #000;
    background-color: transparent;
    border: none !important;
    box-shadow: none !important;
}
&.active {
    border: none !important;
    box-shadow: none !important;
    color: #000;
    background-color: transparent;
}
`

const MessageBar = styled.div`
height: 8vh;
position: absolute;
justify-content: center;
align-items: center;
padding: 1vw;
width: 64.333%;
margin: -10vh auto 0 auto;
display: flex;
z-index: 12;
background-color: var(--white);
border: 1px solid var(--black);
margin-right: calc(var(--bs-gutter-x) * .5);
margin-left: calc(var(--bs-gutter-x) * .5);
 span {
    width: 60%;
    color: var(--black);
    z-index: 12;
    font-size: 20px;
    line-height: 8vw;
    font-weight: 500;
    @media(max-width:${variables.medium}){
        line-height: 4vw;
    }
 }
   @media(max-width:${variables.medium}){
            top: 20vh;
            position: fixed;
            margin: 0 auto;
            width: 65.333%;
    }
`


const CloseButton = styled.div`
display: flex;
align-content: center;
justify-content: center;
background: rgba(183, 32,32, 0.8);
z-index: 15;
font-size: 14px;
font-weight: 500;
width: 10vw;
height: 6vh;
letter-spacing: 1.5px;
line-height: 6vh;
margin: 0 0 0 auto;
position: relative;
color: var(--white);
text-transform: uppercase;
font-weight: 500;
&:hover, &:active {
cursor: pointer;
}

@media(max-width: ${variables.medium}){
    font-size: 14px;
    line-height: 4vh;
    width: 20%;
    line-height: 6vh;
    font-weight: 600;
}
`

export const ContactForm = () => {
    const [toSend,
        setToSend] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [closedModal,
        setClosedModal] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();

        sendForm('service_cnqld15', 'template_m08ndgf', 'form', 'UZj0hTmyzrNYDI30y').then((response) => {
            setToSend({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setClosedModal(false)
        }).catch((err) => {
            console.log('FAILED...', err);
        });
    };


    const handleChange = (e) => {
        setToSend({
            ...toSend,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Fragment>
            <MessageBar
                className={closedModal === true
                    ? "closedModal"
                    : null}>
                <span>Thank you for reaching out!</span>
                <CloseButton
                    onClick={() => {
                        setClosedModal(true)
                    }}>Close</CloseButton>
            </MessageBar>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <Col xs={1}></Col>
            <Col>
                <form onSubmit={onSubmit}>
                    <FormRow>
                        <Col>
                            <FormInput className="minimal"
                                type='text'
                                name='first_name'
                                placeholder='First Name'
                                value={toSend.first_name}
                                onChange={handleChange}/>
                            <FormInput className="minimal"
                                type='text'
                                name='last_name'
                                placeholder='Last Name'
                                value={toSend.last_name}
                                onChange={handleChange}/>
                        </Col>
                    </FormRow>
                    <FormRow>
                        <Col>
                            <FormInput className="minimal"
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={toSend.email}
                                onChange={handleChange}/>
                            <FormSelect className="minimal" required name='subject'>
                                <option  disabled defaultValue="">Reason For Reaching Out</option>
                                <option value='Work Inquiry'>Work Inquiry</option>
                                <option value='Hire Me'>Hire Me</option>
                                <option value='General'>General</option>
                            </FormSelect>

                        </Col>
                    </FormRow>
                    <FormRow>
                        <Col>
                            <FormTextArea className="minimal"
                                name='message'
                                placeholder="What's up?"
                                value={toSend.message}
                                onChange={handleChange}
                                width='100%'/>
                        </Col>

                    </FormRow>
                    <FormRow>
                        <StyledReCAPTCHA
                        sitekey={'6LcrxNwfAAAAAOIl4NGttRCHXdfP9iJX-26cxrYf'}
                        onSubmit={onSubmit}
                        name="g-recaptcha-response"/>
                        <ContactFormButton 
                        className="btn-flip"
                        data-back='Submit'
                        data-front='Submit'
                        type='submit' 
                        value='Submit'></ContactFormButton>
                    </FormRow>
                </form>
            </Col>
            <Col xs={1}></Col>
        </Fragment>

    );
} 
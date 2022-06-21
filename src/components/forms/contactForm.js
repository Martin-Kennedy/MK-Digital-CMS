import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import {sendForm} from 'emailjs-com';
import {Row, Col} from 'react-bootstrap';


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

    const onSubmit = (e) => {
        e.preventDefault();

        sendForm('service_cnqld15', 'template_m08ndgf', 'form', 'UZj0hTmyzrNYDI30y').then((response) => {
        }).catch((err) => {
            console.log('FAILED...', err);
        });
    };

    const onChange = (value) => {
    }

    const handleChange = (e) => {
        setToSend({
            ...toSend,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Fragment>
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
                        sitekey={process.env.RECAPTCHA}
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
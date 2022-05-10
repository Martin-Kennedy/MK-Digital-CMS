import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import {sendForm} from 'emailjs-com';
import {Row, Col} from 'react-bootstrap';
const ContactFormButton = styled.button `
width: 10vw;
background-color: var(--white);
color: var(--black);
font-size: 1.2vw;
height: 4vw;
line-height: 4vw;
padding: 0 1vw;
`

const FormRow = styled(Row)`
margin-top: 5vh;
`

const FormInput = styled.input`
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
            console.log('SUCCESS!', response.status, response.text);
        }).catch((err) => {
            console.log('FAILED...', err);
        });
    };

    const onChange = (value) => {
        console.log("Captcha value:", value);
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
                        <FormInput
                            type='text'
                            name='first_name'
                            placeholder='First Name'
                            value={toSend.first_name}
                            onChange={handleChange}/>
                        <FormInput
                            type='text'
                            name='last_name'
                            placeholder='Last Name'
                            value={toSend.last_name}
                            onChange={handleChange}/>
                    </Col>
                </FormRow>
                <FormRow>
                    <Col>
                        <FormInput
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={toSend.email}
                            onChange={handleChange}/>
                        <FormInput
                            type='number'
                            name='phone'
                            placeholder='Phone'
                            value={toSend.phone}
                            onChange={handleChange}/>
                    </Col>
                </FormRow>
                <FormRow>
                    <select name='subject'>
                        <option value='Work Inquiry'>Work Inquiry</option>
                        <option value='Hire Me'>Hire Me</option>
                        <option value='General'>General</option>
                    </select>
                </FormRow>
                <FormRow>
                    <textarea
                        name='message'
                        placeholder='Message'
                        value={toSend.message}
                        onChange={handleChange}
                        width='100%'/>
                </FormRow>

                <ReCAPTCHA
                    sitekey="6LcrxNwfAAAAAOIl4NGttRCHXdfP9iJX-26cxrYf"
                    onSubmit={onSubmit}
                    name="g-recaptcha-response"/>
                <FormRow>
                    <ContactFormButton type='submit' value='Submit'></ContactFormButton>
                </FormRow>
            </form>
            </Col>
            <Col xs={1}></Col>
        </Fragment>

    );
}
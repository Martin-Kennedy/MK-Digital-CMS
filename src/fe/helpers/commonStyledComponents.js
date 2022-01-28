import React from "react";
import styled from "styled-components";
import { Row, Col } from 'react-bootstrap';

export const displayValueArray = [
    "/blog", "/case-studies"
]

export const MediumText = styled.p`
font-size: 2rem;
font-weight: 300;
color: ${props => props.white ? "#fff" : "#1d1e22"} 
`

export const SmallAndThinText = styled.p`
font-size: 14px;
font-weight: 100;
margin-bottom: .5rem;
color: ${props => props.white ? "#fff" : "#1d1e22"} 
`

export const SmallAndThinTextSpaced = styled(SmallAndThinText)`
letter-spacing: .2rem;
`

export const Line = styled.div`
    position: relative;
    display: block;
    width: 100%;
    margin: 0 0 3rem ;
    border-bottom: ${props => props.white ? "#fff" : "#1d1e22"} 1px solid;
`

export const Main = styled(Row)`
    color: ${props => props.white ? "#fff" : "#1d1e22"} 
    position: relative;
    z-index: 1;
    margin-bottom: 3rem;
    h2 {
        font-size: 16px;
        font-weight: 200;
        position: relative;
        top: 55px;
    }
    span {
        position: relative;
        line-height: 4.2rem;
        font-size: 3rem;
        font-weight: 300;
        padding-left: 150px;
        white-space: nowrap;
        margin: 0;
        }
    
    
    p {
        position: relative;
        line-height: 4.2rem;
        font-size: 3rem;
        font-weight: 300;
        }
    }

    `
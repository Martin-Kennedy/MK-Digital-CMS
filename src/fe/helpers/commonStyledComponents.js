import React from "react";
import styled from "styled-components";
import { Row, Col } from 'react-bootstrap';

export const MediumText = styled.p`
font-size: 2rem;
font-weight: 300;
`

export const Main = styled(Row)`
    color: #1d1e22;
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
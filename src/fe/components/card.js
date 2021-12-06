import React, {Component} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import faker from 'faker';
import styled from 'styled-components'; 

const Background = styled(Row)`
background-color: #1d1e22; 
`;
export default class Card extends Component {
    render(){
        return(

            <Card>
                <Background>
                    <Row>
                      <Col></Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                </Background>
            </Card>

        )
    }
}
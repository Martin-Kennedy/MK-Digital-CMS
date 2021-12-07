import React, {Component} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import styled from 'styled-components'; 
import { connect } from 'react-redux'
import { getUsers } from '../actions/users.actions'
import store from '../store/store';

const Background = styled(Row)`
background-color: #1d1e22; 
`;

const mapStateToProps = state => {
    return {
        users: state.users
    };
};


class BlogCard extends Component {

    render() {
            return (
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




export default connect(mapStateToProps,  {getUsers} )(BlogCard)
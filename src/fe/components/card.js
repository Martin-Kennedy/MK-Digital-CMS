import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { currentUserArray: state.users.currentUser };
};


const Background = styled(Row)`
background-color: #1d1e22; 
`;


const buildCardArray = (userProp) => {
    const cardArray = userProp.currentUserArray.map((user, index) =>
        // Correct! Key should be specified inside the array.
        <Card key={user.id}>
        <Background>
            <Row>
                <Col >{user.first_name}</Col>
            </Row>
            <Row>
                <Col> }>{user.last_name}</Col>
            </Row>
            <Row>
                <Col>}>{user.email}</Col>
            </Row>
        </Background>
        </Card>
    );
    return cardArray;
}


const BlogCard = (userProp) => (<div>
    {Array.isArray(userProp.currentUserArray) ? buildCardArray(userProp) : null}
</div>)

            
                



export default connect(mapStateToProps)(BlogCard);
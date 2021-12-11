import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {currentUserArray: state.users.currentUser};
};

const buildCardArray = (userProp) => {
    const cardArray = userProp
        .currentUserArray
        .map((user, index) =>
        // Correct! Key should be specified inside the array.
        {
            const dynamicStyles = {
                backgroundColor: user.bkgColor,
                width: `${user.width}px`,
                height: `${user.height}px`
            };
            const card = <Card key={user.id}>
                {console.log(userProp)}
                <Row style={dynamicStyles}>
                    <Row>
                        <Col >{user.first_name}</Col>
                    </Row>
                    <Row>
                        <Col>{user.last_name}</Col>
                    </Row>
                    <Row></Row>
                </Row>
            </Card>
            return card;
        });
    return cardArray;
}

const BlogCard = (userProp) => (
    <div>
        {Array.isArray(userProp.currentUserArray)
            ? buildCardArray(userProp)
            : null}
    </div>
)

export default connect(mapStateToProps)(BlogCard);
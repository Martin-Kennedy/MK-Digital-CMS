import React from "react";
import {Row, Col} from 'react-bootstrap';
import faker from 'faker';

const BlogComponent = () => {

    return (
        <Row>
            <Col>
                <p>{faker.lorem.paragraphs(2)}</p>
            </Col>
            <Col>
                <img src={faker.image.lorempicsum.imageUrl(500, 500)}></img>
            </Col>
        </Row>
    );
};

export default BlogComponent;
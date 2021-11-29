import React from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

export default class BlogLanding extends React.Component {
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <Header />
                    </Col>
                </Row>
                {/* Above the Fold Text and CTA */}
                <Row>
                    {/* Content Left  */}
                    <Col>

                    </Col>
                    {/* Content right  */}
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Blog Menu */}
                    </Col>
                </Row>
                
                {/* Blog Grid */}
                
                
                <Footer />
            </Container>
        )
    }
}


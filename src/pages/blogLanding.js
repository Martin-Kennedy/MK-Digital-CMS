import React from 'React';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';

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
                <Row>
                    <Col>
                        {/* Blog Menu */}
                    </Col>
                </Row>
                <Row>
                    {/* Blog Grid */}
                </Row>
                <Footer />
            </Container>
        )
    }
}


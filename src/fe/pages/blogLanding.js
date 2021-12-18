import React from 'react';
import { Row, Col} from 'react-bootstrap';
import faker from 'faker';
import styled from 'styled-components';
import BlogCard from '../components/card';

const TopRow = styled(Row)`
padding-top: 120px;
`

const Hero = styled(Col)`
min-height: calc(80vh - 120px);
padding: 60px 0 100px 0;
`

const H2 = styled.h2 `
text-align: left;
font-size: 1rem;
font-weight: 100;
`

const H2Line = styled(Col)`
        alignItems: "center",
        height: 50%;
        border-top: 1px solid #1d1e22;
`

const BlogLanding = () => (

    <div>
        <TopRow>
            <Col sm={2}></Col>
            <Hero xs={8}>
                <Row>
                    <H2Line sm={4}></H2Line>
                    <Col sm={2}>
                        <H2 >WHAT'S GOING ON</H2>
                    </Col>
                    <Col>
                        <p>{faker.lorem.paragraph(8)}</p>
                    </Col>
                </Row>
                <Row>
                    {console.log(faker.image.image())}
                </Row>
            </Hero>
            <Col sm={2}></Col>
        </TopRow>
        {/* Above the Fold Text and CTA */}
        <Row>

                <BlogCard />

        </Row>
        <Row>
            <Col>

                {/* Blog Menu */}
            </Col>
        </Row>
        <Row>
            <Col>
                {/* Blog Grid */}
            </Col>
        </Row>
    </div>

)

export default BlogLanding;

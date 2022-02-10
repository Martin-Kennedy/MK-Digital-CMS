import React, {Component, useState, useEffect} from 'react';
import {Row} from 'react-bootstrap';

import Spinner from 'react-bootstrap/Spinner'
import {connect} from 'react-redux';
import {BlogFilterButtonsContainer} from './filterButtons';
import { FilteredCardsContainer, UnfilteredCardsContainer } from './blogCards';
import { LineAnimationR2L } from "../designElementComponents/lineSvg";
const BlogFilterButtons = BlogFilterButtonsContainer;
const UnfilteredCards = UnfilteredCardsContainer;
const FilteredCards = FilteredCardsContainer;
import styled from 'styled-components';

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            filteredData: state.blogs.filteredData,
        }
    }
};

const FilterLine = styled(Row)`
    margin: 0 0 50px 0;
    z-index: 0;
    padding-left: 0;
    
    svg  {
        position: relative;
        top: -20px;
        left: -30px;
        padding-left: 0;
        line {
            stroke: #1d1e22;
        }
    }
`

const FilterContainer = styled(Row)`
    height: 100px;
    z-index: 1;
`
const StyledSpinner = styled(Spinner)`
position: absolute;
top: 115vh;
left: calc(50vw - 50px);
width: 100px;
height: 100px;
z-index: 1;
`

const BuildCardArray = (props) => {
    

    
    const cardArray =
        <Row>
            <FilterContainer >
                <BlogFilterButtons />
            </FilterContainer>
            
            <FilterLine>
                <LineAnimationR2L />
            </FilterLine>
            <Row>
                
                {props.data.blogs.filteredData.length
                    ? <FilteredCards />
                    : <UnfilteredCards />
                }
                
                
            </Row>
        </Row>
    return cardArray;
}

class BlogCardsContainer extends Component {

    render() {
        return (
            <div>
                {Array.isArray(this.props.blogs.blogData)
                    ? <BuildCardArray data={this.props} />
                    : null}
                <StyledSpinner animation="border" ></StyledSpinner>
            </div>
        )
    }
}

export default connect(mapStateToProps)(BlogCardsContainer);
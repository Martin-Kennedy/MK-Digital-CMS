import React, {Component, useState, useEffect} from 'react';
import {Row} from 'react-bootstrap';
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
const CardArrayRow = styled(Row)`
background-color: transparent;
`

const BuildCardArray = (props) => {
    

    
    const cardArray =
        <CardArrayRow>
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
        </CardArrayRow>
    return cardArray;
}

class BlogCardsContainer extends Component {

    render() {
        return (
            <div>
                {Array.isArray(this.props.blogs.blogData)
                    ? <BuildCardArray data={this.props} />
                    : null}
                
            </div>
        )
    }
}

export default connect(mapStateToProps)(BlogCardsContainer);
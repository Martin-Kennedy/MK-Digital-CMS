import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import FilterButtons from './filterButtons';
import FilteredCards from './filteredCards';
import UnfilteredCards from './unfilteredCards';
import { LineAnimationR2L } from "../designElementComponents/lineSvg";
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
        top: -40px;
        left: -30px;
        padding-left: 0;
        line {
            stroke: #1d1e22;
        }
    }
`

const FilterContainer = styled(Row)`
    height: 50px;
    z-index: 1;
`

const buildCardArray = (props) => {
    const cardArray = <Row>
       
            <FilterContainer >
                <FilterButtons />
            </FilterContainer>
        
            <FilterLine>
                <LineAnimationR2L />
            </FilterLine>
        
        
        
        <Row>
            {props.blogs.filteredData.length
                ? <FilteredCards />
                : <UnfilteredCards />
            }
        </Row>

        
    </Row>
    return cardArray;
}

class BlogCard extends Component {

    render() {
        return (
            <div>
                {Array.isArray(this.props.blogs.blogData)
                    ? buildCardArray(this.props)
                    : null}
            </div>
        )
    }
}

export default connect(mapStateToProps)(BlogCard);
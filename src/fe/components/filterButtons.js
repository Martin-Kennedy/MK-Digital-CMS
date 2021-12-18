import React from 'react';
import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { sortByBlogSubject } from '../actions/filters.actions';

const BlogFilterBtn = styled(Button)`
display: flex;
flex: 1;
justify-content: center;
width: auto;
background-color: transparent;
color: #000;
border: 0;
transition: .5s ease;
&:hover, &:focus {
    font-size: 20px;
    color: #000;
    background-color: transparent;
}
&.active {
    font-size: 20px;
    color: #000;
    background-color: transparent;
}`;

const FilterContainer = styled(Col)`
display: flex;
flex-direction: row;
background-color: transparent;
border-bottom: 1px solid #000;
border-top: 1px solid #000;
margin-bottom: 50px;
padding: 20px 0;
height: 80px;
`;

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            filteredData: state.blogs.filteredData,
            sortBy: state.blogs.sortBy,
            activeButton: state.blogs.activeButton
        }
    }
};


const buildSubjectArray = (props) => {
    const subjectArray = [...new Set(props.blogs.blogData.map(item => item.subject))]
    return subjectArray;
}

const FilterButtons = (props) => <FilterContainer sm={8}>
{
    buildSubjectArray(props).map((subject, index) => {
        const FilterButton = <BlogFilterBtn
            key={index}
            value={subject}
            active={props.blogs.activeButton === index ? true : false}
            onClick={(e) => {
                props.dispatch(sortByBlogSubject(e.target.value, index));
            }}>{subject}</BlogFilterBtn>
        return FilterButton;
    })
}
</FilterContainer>;

export default connect(mapStateToProps)(FilterButtons);
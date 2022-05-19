import React from 'react';
import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { sortByBlogSubject, sortByProjectExpertise } from '../../actions/filters.actions';

const BlogFilterBtn = styled(Button)`
display: flex;
font-size: 14px;
font-weight: 100;
width: fit-content;
background-color: transparent;
color: #000;
border: 0;
transition: .5s ease;
padding: 0;
margin: 0;
margin-right: 2vw;
transform-style: preserve-3d;
transform: translateZ(-25px);
transition: transform 0.3s;

&:first-child {
    margin-left: 0;
}

&:hover, &:focus {
    color: #000;
    background-color: transparent;
    border: none !important;
    box-shadow: none !important;
}
&.active {
    border: none !important;
    box-shadow: none !important;
    color: #000;
    background-color: transparent;
}`;

const FilterContainer = styled(Col)`
display: flex;
flex-direction: row;
background-color: transparent;
margin-bottom: 5vh;
padding: 5vh 0;
height: 80px;
`;

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            filteredData: state.blogs.filteredData,
            sortBy: state.blogs.sortBy,
            activeButton: state.blogs.activeButton
        },
        projects: {
            projectData: state.projects.projectData,
            filteredData: state.projects.filteredData,
            sortBy: state.projects.sortBy,
            activeButton: state.projects.activeButton
        }
    }
};


const buildSubjectArray = (props) => {
    const subjectArray = [...new Set(props.blogs.blogData.map(item => item.subject))]
    return subjectArray;
}

const buildExpertiseArray = (props) => {
    const expertiseArray = [...new Set(props.projects.projectData.map(item => item.expertise))]
    return expertiseArray;
}

const BlogFilterButtons = (props) => <FilterContainer>
    <BlogFilterBtn
        className="btn-flip"
        data-back={'All'}
        data-front={'All'}
        key={0}
        value={'All'}
        active={props.projects.activeButton === 0 ? true : false}
        onClick={(e) => {
            props.dispatch(sortByProjectExpertise('All', 0));
        }}>
    </BlogFilterBtn>
{
    buildSubjectArray(props).map((subject, index) => {
        console.log(subject)
        const FilterButton = <BlogFilterBtn
            className="btn-flip" 
            data-back={subject} 
            data-front={subject}
            key={index + 1}
            value={subject}
            active={props.blogs.activeButton === index + 1 ? true : false}
            onClick={(e) => {
                props.dispatch(sortByBlogSubject(subject, index + 1));
            }}>
           
            </BlogFilterBtn>
            
        return FilterButton;
    })
}
</FilterContainer>;

const ProjectFilterButtons = (props) => <FilterContainer>
    <BlogFilterBtn
        className="btn-flip"
        data-back={'All'}
        data-front={'All'}
        key={0}
        value={'All'}
        active={props.projects.activeButton === 0 ? true : false}
        onClick={(e) => {
            props.dispatch(sortByProjectExpertise('All', 0));
        }}>
    </BlogFilterBtn>
    {
        buildExpertiseArray(props).map((expertise, index) => {
            
            const FilterButton = <BlogFilterBtn
                className="btn-flip"
                data-back={expertise}
                data-front={expertise}
                key={index + 1}
                value={expertise}
                active={props.projects.activeButton === index + 1 ? true : false}
                onClick={(e) => {
                    props.dispatch(sortByProjectExpertise(expertise, index + 1));
                }}>
            </BlogFilterBtn>

            return FilterButton;
        })
    }
</FilterContainer>;

export const BlogFilterButtonsContainer =  connect(mapStateToProps)(BlogFilterButtons);
export const ProjectFilterButtonsContainer = connect(mapStateToProps)(ProjectFilterButtons);
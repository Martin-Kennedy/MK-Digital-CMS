import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ProjectFilterButtonsContainer } from './filterButtons';
import { FilteredCardsContainer, UnfilteredCardsContainer  } from './projectCards';
import { getProjects } from '../../actions/projects.actions';
import { LineAnimationR2L } from "../designElementComponents/lineSvg";
import cookie from 'react-cookie'
import styled from 'styled-components';

const ProjectFilterButtons = ProjectFilterButtonsContainer;
const UnfilteredCards = UnfilteredCardsContainer;
const FilteredCards = FilteredCardsContainer;

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
        },
        projects: {
            projectData: state.projects.projectData,
            filteredData: state.projects.filteredData,
        }
    }
};

const FilterLine = styled(Row)`
    margin: 0 0 50px 0;
    z-index: 0;
    padding-left: 0;
    
    svg  {
        position: relative;
        top: -10px;
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
    const cardArray = 
    <Row>
        <FilterContainer >
                <ProjectFilterButtons />
        </FilterContainer>

        <FilterLine>
            <LineAnimationR2L />
        </FilterLine>
        <Row>
            {props.projects.filteredData.length
                ? <FilteredCards />
                : <UnfilteredCards />
            }
        </Row>
    </Row>
    return cardArray;
}

class ProjectCardContainer extends Component {
    componentDidUpdate(prevProps) {
        
        if(prevProps.initialUtility.session !== this.props.initialUtility.session) {
            if (!this.props.projects.projectData.length) {
                console.log(this.props.initialUtility.keystoneToken)
                console.log('this is running')
                this.props.dispatch(getProjects(this.props.initialUtility.keystoneToken))
            }
        }
        

    }

    render() {
        return (
            <div>
                {console.log(this.props.projects.projectData)}
                {Array.isArray(this.props.projects.projectData)
                    ? buildCardArray(this.props)
                    : null}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ProjectCardContainer);
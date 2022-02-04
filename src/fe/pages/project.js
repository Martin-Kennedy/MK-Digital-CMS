import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import HeaderComponent from '../components/navigation/header';
import ProjectPageHero from '../components/heros/projectPageHero';
import { FadeInWhenVisibleOpacity } from '../helpers/fadeInOnViewport';
import { connect } from 'react-redux';
import { getProjectItem } from '../actions/projects.actions';

const mapStateToProps = state => {
    return {
        projects: {
            projectData: state.projects.projectData,
            projectItem: state.projects.projectItem
        }
    }
};




class ProjectPage extends Component {
    

    componentDidUpdate(prevProps) {
        
        if (prevProps.projects.projectData !== this.props.projects.projectData ){
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug.replace(/-/g, ' ').replace(/_/g, ' ');
            this.props.dispatch(getProjectItem(revertedTitle))
        }
    }
    

    render(){
        let item = this.props.projects.projectItem[0];
        return (<div>
            {this.props.projects.projectItem.length
                ? <FadeInWhenVisibleOpacity duration={2}>
                    
                    <HeaderComponent />
                    <ProjectPageHero item={item} />

                    <Row><div>this is the first name {item.client}</div></Row>
                    <Row><div>this is the last name {item.expertise}</div></Row>
                    <Row><img src={item.projectCardImage} /></Row>
                </FadeInWhenVisibleOpacity>
                : 'loading'
            }
        </div>)
    
    
}
}

export default connect(mapStateToProps)(ProjectPage);
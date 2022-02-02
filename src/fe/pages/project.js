import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import HeaderComponent from '../components/navigation/header';
import ProjectPageHero from '../components/heros/projectPageHero';
import { FadeInWhenVisibleOpacity } from '../helpers/fadeInOnViewport';
import { connect } from 'react-redux';
import { getBlogItem } from '../actions/blogs.actions';

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            blogItem: state.blogs.blogItem
        }
    }
};




class ProjectPage extends Component {
    

    componentDidUpdate(prevProps) {
        
        if(prevProps.blogs.blogData !== this.props.blogs.blogData){
            let path = this.props.location.pathname;
            let slug = path.substring(path.lastIndexOf('/') + 1)
            const revertedTitle = slug.replace(/-/g, ' ').replace(/_/g, ' ');
            this.props.dispatch(getBlogItem(revertedTitle))
        }
    }

    getFirstPathSegmennt(props) {
        const derp = props.split('/')[1];
        console.log(derp)
        return props.split('/')[1];
        
    }
    

    render(){
        let item = this.props.blogs.blogItem[0];
        return (<div>
            {this.props.blogs.blogItem.length
                ? <FadeInWhenVisibleOpacity duration={2}>
                    
                    <HeaderComponent location={this.getFirstPathSegmennt(this.props.location.pathname)} />
                    <ProjectPageHero />

                    <Row><div>this is the first name {item.first_name}</div></Row>
                    <Row><div>this is the last name {item.last_name}</div></Row>
                    <Row><img src={item.blogCardImage} /></Row>
                </FadeInWhenVisibleOpacity>
                : 'loading'
            }
        </div>)
    
    
}
}

export default connect(mapStateToProps)(ProjectPage);
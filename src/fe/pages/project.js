import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
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
    

    render(){

        
        
        return (<div>
            derp it up {console.log(this.props.blogs.blogItem)}
        </div>)
    }
    
}

export default connect(mapStateToProps)(ProjectPage);
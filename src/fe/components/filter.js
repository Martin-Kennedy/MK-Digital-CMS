import React from 'react';
import { connect } from 'react-redux';
import { sortByBlogSubject } from '../actions/filters';
import {Row, Col, Button } from 'react-bootstrap';

const BlogFilter = (props) => (
        <Button  
        // value={} 
        // onClick={(e) => {
        //     props.dispatch(sortByBlogSubject(e.target.value));
        // }} 
        />
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        blogSubject: state.blogSubject
    };
};

export default connect(mapStateToProps)(BlogFilter);
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import FilterButtons from './filterButtons';
import FilteredCards from './filteredCards';
import UnfilteredCards from './unfilteredCards'

const mapStateToProps = state => {
    return {
        blogs: {
            blogData: state.blogs.blogData,
            filteredData: state.blogs.filteredData,
        }
    }
};

const buildCardArray = (props) => {
    const cardArray = <Row>
        <Row>
            <Col sm={2}></Col>
            <FilterButtons/>
            <Col sm={2}></Col>
        </Row>

        {props.blogs.filteredData.length
            ? <FilteredCards/>
            : <UnfilteredCards/>
}

    </Row>
    return cardArray;
}

class BlogCard extends Component {

    constructor(props) {
        super(props);
    }

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
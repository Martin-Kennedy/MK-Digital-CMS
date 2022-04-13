import React from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import { searchActionCloseSurfSpots } from '../../actions/surfApp.actions'


// Imagine you have a list of languages that you'd like to autosuggest.


const mapStateToProps = state => {
    return {
        locations: state.surf.locations
    }
}

const mapDispatchToProps = dispatch => {
    searchActionCloseSurfSpots: closeSurfSpots => dispatch(searchActionCloseSurfSpots(closeSurfSpots))
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, data) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : data.filter(location =>
        location.town.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.town;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.town}
    </div>
);

class SurfSpotsSearchFilter extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    componentDidMount(){
        const { searchActionCloseSurfSpots} = this.props;
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.locations)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    onSuggestionSelected = (click, { suggestion, suggestionValue}) => {
        this.props.locations.filter(location => {
            location.town.toLowerCase() === suggestionValue
            
        })
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfSpotsSearchFilter);
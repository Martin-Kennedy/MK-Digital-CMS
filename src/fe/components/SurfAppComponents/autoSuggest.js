import React from 'react';
import Autosuggest from 'react-autosuggest';
const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');
import {connect} from 'react-redux';
import {searchActionCloseSurfSpots, getCloseSurfSpots} from '../../actions/surfApp.actions'

// Imagine you have a list of languages that you'd like to autosuggest.

const mapStateToProps = state => {
    return {locations: state.surf.locations}
}

const mapDispatchToProps = dispatch => ({
    searchActionCloseSurfSpots: closeSurfSpots => dispatch(searchActionCloseSurfSpots(closeSurfSpots)),
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots))
})

// Teach Autosuggest how to calculate suggestions for any given input valu

function getSuggestions(value, data) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return data.filter(location => regex.test(getSuggestionValue(location)));
}
function getSuggestionValue(suggestion) {
    return `${suggestion.town}, ${suggestion.countryOrState}`;
}

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion, {query}) {
    const suggestionText = `${suggestion.town}, ${suggestion.countryOrState}`;
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);

    return (

        <span >
            {parts.map((part, index) => {
                const className = part.highlight
                    ? 'highlight'
                    : null;

                return (
                    <span className={className} key={index}>{part.text}</span>
                );
            })
}
        </span>
    );
}

class SurfSpotsSearchFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            lat: '',
            lng: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.lat != this.state.lat){
            const { searchActionCloseSurfSpots } = this.props;
            console.log(this.state.lat, this.state.lng)
            searchActionCloseSurfSpots({latitude: this.state.lat, longitude: this.state.lng});
    }
}



    onChange = (event, {newValue}) => {
        this.setState({value: newValue});
    };

    // Autosuggest will call this function every time you need to update
    // suggestions. You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.locations)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };
    onSuggestionSelected = (click, {suggestion, suggestionValue}) => {
        const result = this
            .props
            .locations
            .filter(location => {
                return location.fullLocation === suggestionValue
            })
        this.setState({ lat: result[0].lat, lng: result[0].lng });
    }

    render() {
        const {value, suggestions} = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (<Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}/>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfSpotsSearchFilter);
import React from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components'
const match = require('autosuggest-highlight/match');
const parse = require('autosuggest-highlight/parse');
import {connect} from 'react-redux';
import {searchActionCloseSurfSpots, getCloseSurfSpots, searchOpenState} from '../../actions/surfApp.actions';
import variables from '../../variables.module.scss';

// Imagine you have a list of languages that you'd like to autosuggest.

const mapStateToProps = state => {
    return {
        locations: state.surf.locations,
        isSearchOpen: state.surf.isSearchOpen,
    }
}

const mapDispatchToProps = dispatch => ({
    searchActionCloseSurfSpots: closeSurfSpots => dispatch(searchActionCloseSurfSpots(closeSurfSpots)),
    getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
    searchOpenState: isOpen => dispatch(searchOpenState(isOpen))
})

const StyledAutoSuggest = styled.div`
    input {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right-color: rgba(255, 255, 255, 0.07);
    border-bottom-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
    position: relative;
    width: 100%;
    height: 4vh;
    padding: 4%;
    font-size: 1vw;
    letter-spacing: 0.06vw;
    color: rgba(255, 255, 255, 0.8);
    @media(max-width: ${variables.large}){
        background: transparent;
        width: 80%;
        margin: 6vw auto 0 auto;
        display: block;
        border: 0px;
        border-radius: 0;
        border-bottom: 1px solid rgba(255,255,255,0.6);
        font-size: 4vw;
    }
    &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    }
    &:focus-visible {
    outline: none;
    color: rgba(255, 255, 255, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.35);
     @media(max-width: ${variables.large}){
        border: 0;
        border-bottom: 1px solid rgba(255,255,255,1);
        }
    }
}
`

const SuggestionTextContainer = styled.div`
color: white;
   
    span {
        opacity: 0.6;
    }
    & .highlight {
        opacity: 1;
    }
`


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

        <SuggestionTextContainer>
            {parts.map((part, index) => {
                const className = part.highlight
                    ? 'highlight'
                    : null;

                return (
                    <span className={className} key={index}>{part.text}</span>
                );
            })
}
        </SuggestionTextContainer>
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
            });
        const { searchOpenState } = this.props;
        searchOpenState(this.props.isSearchOpen)
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
        return (<StyledAutoSuggest>
            <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            />
                </StyledAutoSuggest>
                );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurfSpotsSearchFilter);
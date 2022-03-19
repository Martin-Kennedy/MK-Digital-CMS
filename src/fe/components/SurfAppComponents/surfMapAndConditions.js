import React from 'react';
import styled from 'styled-components';

const StyledMapImg = styled.div`
 border-radius: 5px 5px 15px 15px;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.15);
border-right-color: rgba(255, 255, 255, 0.07);
border-bottom-color: rgba(255, 255, 255, 0.07);
 box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 50px 40px rgba(0, 0, 0, 0.062);
 width: 100%;
 height: 225px;
 background-size: cover;
 background-repeat: no-repeat;
 background-image: ${props => props.coords ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${props.coords.lat},${props.coords.lng}&zoom=11&size=800x250&style=feature:water|element:all|color:0x55a8e5&key=AIzaSyBj-Wc8m2pdQxlR-YBJLMcgda-3HLJiERw)` : null};
`


export const SurfMapAndConditions = (props) => {
    return (
        <StyledMapImg coords={props}  ></StyledMapImg>
    )
};

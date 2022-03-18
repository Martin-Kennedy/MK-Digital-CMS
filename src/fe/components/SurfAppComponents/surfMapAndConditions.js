import React from 'react';
import styled from 'styled-components';


export const SurfMapAndConditions = (props) => {
    console.log(props)
    return (
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=13&size=500x250&key=AIzaSyBhByDDzmQ1rit2QYE5vOSdgmJ0RpB9xe0`} />
    )
};

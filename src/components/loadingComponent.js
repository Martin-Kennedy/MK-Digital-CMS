import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
top: 0;
left: 0;
`;

const StyledLoadingImage = styled.div`
background-image: url('/spinningLoading.gif');
background-position: center center;
background-repeat: no-repeat;
background-size: cover;
width: 200px;
height: 200px;
position: fixed;
top: calc(50vh - 100px);
left: calc(50vw - 100px);

`

const Loading = () => {
    return (
    <StyledLoadingContainer>
        <StyledLoadingImage></StyledLoadingImage>
    </StyledLoadingContainer>
    );
}

export default Loading;
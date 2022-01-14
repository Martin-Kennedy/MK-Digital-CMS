import { useState, useEffect } from 'react';

export const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

export const generateHsl = () => {
    for (let i = 0; i < 5; i++) {
        const hsl = 'hsl(' + randomValue(0, 60) + ', ' + randomValue(10, 30) + '%,  ' + randomValue(70, 80) + '%)';
        return hsl;
    }
}

export const listenToScroll = (setState) => {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setState = {
        scrollPosition: scrolled,
    }
}

export const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};


function getWindowDimensions() {
    const width = window.innerWidth;
    return  width;
}

export function useWindowDimensions ()  {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        
        setWindowDimensions(getWindowDimensions());
       
    }, []);

    return windowDimensions;
}

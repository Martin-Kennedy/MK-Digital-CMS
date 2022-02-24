import { useState, useEffect } from 'react';

export const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

export const generateHsl = () => {
    for (let i = 0; i < 5; i++) {
        const hsl = 'hsl(' + randomValue(0, 360) + ', ' + randomValue(30, 40) + '%,  ' + randomValue(50, 70) + '%)';
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

//Haversine Formula

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

export const processAsync = (n) => {
    return new Promise(function (resolve) {
        setTimeout(
            function () { resolve(n * n); },
            Math.random() * 1e3
        );
    });
}

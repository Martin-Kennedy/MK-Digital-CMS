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


export const formatAMPM = (date) => {
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ampm;
    return strTime;
}

export const formatHour = (date) => {
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours;
    return strTime;
}

export const formatAMPMwMins = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = `${hours}:${minutes}${ampm}`;
    return strTime;
}

// /**
//  * @param {number} distance - distance (km) from the point represented by centerPoint
//  * @param {array} centerPoint - two-dimensional array containing center coords [latitude, longitude]
//  * @description
//  *   Computes the bounding coordinates of all points on the surface of a sphere
//  *   that has a great circle distance to the point represented by the centerPoint
//  *   argument that is less or equal to the distance argument.
//  *   Technique from: Jan Matuschek <http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates>
// */

export const getBoundingBox = (centerPoint, distance) => {
    var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
    if (distance < 0) {
        console.log('Illegal arguments for map bounding box');
    }
    // helper functions (degrees<–>radians)
    Number.prototype.degToRad = function () {
        return this * (Math.PI / 180);
    };
    Number.prototype.radToDeg = function () {
        return (180 * this) / Math.PI;
    };
    // coordinate limits
    MIN_LAT = (-90).degToRad();
    MAX_LAT = (90).degToRad();
    MIN_LON = (-180).degToRad();
    MAX_LON = (180).degToRad();
    // Earth's radius (km)
    R = 6378.1;
    // angular distance in radians on a great circle
    radDist = distance / R;
    // center point coordinates (deg)
    degLat = centerPoint[0];
    degLon = centerPoint[1];
    // center point coordinates (rad)
    radLat = degLat.degToRad();
    radLon = degLon.degToRad();
    // minimum and maximum latitudes for given distance
    minLat = radLat - radDist;
    maxLat = radLat + radDist;
    // minimum and maximum longitudes for given distance
    minLon = void 0;
    maxLon = void 0;
    // define deltaLon to help determine min and max longitudes
    deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
    if (minLat > MIN_LAT && maxLat < MAX_LAT) {
        minLon = radLon - deltaLon;
        maxLon = radLon + deltaLon;
        if (minLon < MIN_LON) {
            minLon = minLon + 2 * Math.PI;
        }
        if (maxLon > MAX_LON) {
            maxLon = maxLon - 2 * Math.PI;
        }
    }
    // a pole is within the given distance
    else {
        minLat = Math.max(minLat, MIN_LAT);
        maxLat = Math.min(maxLat, MAX_LAT);
        minLon = MIN_LON;
        maxLon = MAX_LON;
    }
    return {
        minLng: minLon.radToDeg(),
        minLat: minLat.radToDeg(),
        maxLng: maxLon.radToDeg(),
        maxLat: maxLat.radToDeg()
    };
};

export const colorsOnly = (colorString) => { 
    const colors = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
    const r = colors[0];
    const g = colors[1];
   const  b = colors[2];
    const a = 1;
    return [ r, g, b, a]
}
export const RGBAToHexA = ([r, g, b, a]) => {
     r = [0].toString(16);
     g = [1].toString(16);
     b = [2].toString(16);
     a = Math.round([3] * 255).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

// Strip non numeric values from string

export const StripNonNumValFromString = (string) => {
   const number = string.replace(/[^\d.-]/g, '');
   return number;
}


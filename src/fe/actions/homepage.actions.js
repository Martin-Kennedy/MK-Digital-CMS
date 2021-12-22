
import { GET_HOMEPAGE } from '../helpers/types';
import { CAROUSEL_CURRENT_SLIDE, CAROUSEL_STOP_AUTOPLAY, CAROUSEL_START_AUTOPLAY  } from '../helpers/types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/homepage';

export const getHomepage = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_HOMEPAGE,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getCurrentCarouselSlide = (currentSlide, totalSlides) => ({
    type: CAROUSEL_CURRENT_SLIDE,
    currentSlide: currentSlide,
    totalSlides: totalSlides
})

export const stopCarouselAutoPlay = (intervalID) => ({
    type: CAROUSEL_STOP_AUTOPLAY,
    intervalID
})

export const startCarouselAutoPlay = () => ({
    type: CAROUSEL_START_AUTOPLAY
})
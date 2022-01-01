
import { GET_HOMEPAGE } from '../helpers/types'
import { CAROUSEL_HOVER_STATE, CAROUSEL_INTERVAL, CAROUSEL_TEXT, CAROUSEL_CURRENT_STATE } from '../helpers/types'
import axios from 'axios'

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

export const getCurrentSlide = (currentSlide, totalSlides = 0) => ({
    type: CAROUSEL_CURRENT_STATE,
    currentSlide: currentSlide,
    totalSlides: totalSlides
});

export const getCarouselHoverState = (isHovered = false) => ({
    type: CAROUSEL_HOVER_STATE,
    hoverState: isHovered
});

export const getCurrentCarouselIntervalID = (interval) => ({
    type: CAROUSEL_INTERVAL,
    intervalID: interval
})

export const getCurrentCarouselAnimatedText = (text) => ({
    type: CAROUSEL_TEXT,
    carouselText: text
})
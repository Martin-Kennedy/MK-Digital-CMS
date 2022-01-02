
import { GET_HOMEPAGE } from '../helpers/types'
import { CAROUSEL_IMG_WIDTH, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE, CAROUSEL_BKG_COLOR } from '../helpers/types'
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

export const getCurrentSlide = (previousSlide, currentSlide) => ({
    type: CAROUSEL_CURRENT_SLIDE,
    previousSlide: previousSlide,
    currentSlide: currentSlide
});

export const getCurrentCarouselAnimatedText = (text) => ({
    type: CAROUSEL_TEXT,
    carouselText: text
});

export const getCurrentCarouselBkgColor = (color) => ({
    type: CAROUSEL_BKG_COLOR,
    bkgColor: color
})

export const getImgWidth = (width) => ({
    type: CAROUSEL_IMG_WIDTH,
    imgWidth: width
})
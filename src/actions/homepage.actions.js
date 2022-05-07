import { GET_HOMEPAGE, GET_HOMEPAGE_CAROUSEL_ITEMS } from '../helpers/types'
import {CAROUSEL_IMG_WIDTH, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE, CAROUSEL_BKG_COLOR, CAROUSEL_TOTAL_SLIDES} from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/admin/api';
export const getHomepage = (token) => {

    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const bodyParameters = {
            query: `
                query {
                allHomepages {
                    id,
                    sectionOneTitle,
                    sectionOneBlurbOne,
                    sectionOneLink,
                    sectionOneLinkLabel,
                    sectionTwoTitle,
                    sectionTwoBlurbOne
                    sectionTwoBlurbTwo,
                    sectionThreeTitle,
                    sectionThreeBlurbOne,
                    sectionFourTitle,
                    sectionFourBlurb,
                    sectionFourLink,
                    sectionFourLinkLabel,
                    status,
                    }
                }`
        }
        return axios
            .post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({type: GET_HOMEPAGE, payload: data.data.allHomepages[0]})
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const getHomepageCarouselItems = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const bodyParameters = {
        query: `
                query {
                    allHomepageCarousels {
                        listType,
                        clientName {
                            client
                        },
                        cardImage{
                            publicUrl
                        }
                        blogTitle {
                            title
                        },
                        cardColorHexValue,
                        order,
                        textTranslation
                    }
                }`
    }
    return (dispatch) => {
        return axios
            .post(apiUrl, bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then((data) => {
                dispatch({type: GET_HOMEPAGE_CAROUSEL_ITEMS, payload: data.data.allHomepageCarousels})
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const combineCarouselArrays = (blogCarousel) => ({type: COMBINE_CAROUSEL_ARRAYS, payload: blogCarousel})

export const getCurrentSlide = (slides) => ({ type: CAROUSEL_CURRENT_SLIDE, previousSlide: slides.previousSlide, currentSlide: slides.currentSlide});

export const getCurrentCarouselAnimatedText = (text) => ({type: CAROUSEL_TEXT, carouselText: text});

export const getCurrentCarouselBkgColor = (color) => ({type: CAROUSEL_BKG_COLOR, bkgColor: color});

export const getImgWidth = (width) => ({type: CAROUSEL_IMG_WIDTH, imgWidth: width});

export const getTotalSlides = (totalSlides) => ({type: CAROUSEL_TOTAL_SLIDES, totalSlide: totalSlides})
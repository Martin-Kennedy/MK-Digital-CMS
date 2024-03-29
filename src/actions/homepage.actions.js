import { GET_HOMEPAGE, GET_HOMEPAGE_CAROUSEL_ITEMS, GET_ORDERED_SLIDES } from '../helpers/types'
import {CAROUSEL_IMG_WIDTH, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE, CAROUSEL_BKG_COLOR, CAROUSEL_TOTAL_SLIDES} from '../helpers/types'
import axios from 'axios'

const apiUrl = "https://mk-digital-cms.herokuapp.com/admin/api";
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
                    sectionOneLinkColor,
                    sectionTwoTitle,
                    sectionTwoBlurbOne
                    sectionTwoBlurbTwo,
                    sectionThreeTitle,
                    sectionThreeBlurbOne,
                    sectionFourTitle,
                    sectionFourBlurb,
                    sectionFourLink,
                    sectionFourLinkLabel,
                    sectionFourLinkColor,
                    sectionFiveTitle,
                    sectionFiveBlurb,
                    sectionFiveLink,
                    sectionFiveLinkLabel,
                    sectionFiveLinkColor,
                    status,
                    }
                }`
        }
        return axios
            .post(apiUrl, bodyParameters, config)
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
                        textTranslation,
                        description,
                        linkText
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

export const getCurrentCarouselBkgColor = (color) => {
    return (dispatch) => {
        dispatch({ type: CAROUSEL_BKG_COLOR, bkgColor: color })
    }
    
};

export const getImgWidth = (width) => ({type: CAROUSEL_IMG_WIDTH, imgWidth: width});

export const getTotalSlides = (totalSlides) => ({type: CAROUSEL_TOTAL_SLIDES, totalSlide: totalSlides})

export const getOrderedSlides = (orderedSlides) => ({ type: GET_ORDERED_SLIDES, orderedSlides: orderedSlides });
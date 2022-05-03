import {GET_HOMEPAGE, GET_HOMEPAGE_CAROUSEL} from '../helpers/types'
import {CAROUSEL_IMG_WIDTH, CAROUSEL_TEXT, CAROUSEL_CURRENT_SLIDE, CAROUSEL_BKG_COLOR, CAROUSEL_TOTAL_SLIDES} from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/admin/api';
export const getHomepageCarousel = (token) => {
    console.log('making it into homepageCarousel')
    return (dispatch) => {
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
                        blogTitle {
                            title
                        }
                    }
                }`
        }
        return axios
            .post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                dispatch({type: GET_HOMEPAGE_CAROUSEL, payload: data.data.allHomepageCarousels})
            })
            .catch(error => {
                throw(error);
            });
    };
};

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
                allHomepage {
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
                console.log(data)
                dispatch({type: GET_HOMEPAGE, payload: data.data.allHomepages[0]})
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const getHomepageCarouselArray = (homepageCarousel, token) => {
    const results = new Promise((resolve) => {
        console.log('making it into func')
        resolve(homepageCarousel.map((slide) => {
           
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            switch (slide.listType) {
                case 'PROJECT':
                const bodyParametersProject = {
                    query: `query {
                    allProjects (where: {client_contains: "${slide.client}"})  {
                        cardImage,
                        cardColor,
                        title
                    }
                }`
                }
                    console.log('making it here project')
                return axios
                    .post("http://localhost:3000/admin/api", bodyParametersProject, config)
                    .then(response => {
                        return response.data
                    })
                    .then(data => {
                        console.log(data)
                        return data;
                    })
                    .catch(error => {
                        throw (error);
                    });
                    case 'BLOG': 
                    console.log('making it here')
                    const bodyParametersBlog = {
                        query: `
                        query {
                            allBlogs (where: {title_contains: "${slide.title}"})  {
                                cardImage,
                                cardColor,
                                title
                            }
                        }`
                    }
                    return axios
                        .post("http://localhost:3000/admin/api", bodyParametersBlog, config)
                        .then(response => {
                            return response.data
                        })
                        .then(data => {
                            console.log(data)
                            return data;
                        })
                        .catch(error => {
                            throw (error);
                        });
            }
               

            
            
        }))
    })

    return (dispatch) => {
        function onSuccess(data) {
            dispatch({type: GET_HOMEPAGE_CAROUSEL_ARRAY, payload: data.data.allHomepageCarousels})
            return data;
        }

        results.then(data => {
            onSuccess(data)
            return data
        }).catch((error) => {
            console.log(error);
        })
    };
}

export const getCurrentSlide = (previousSlide, currentSlide) => ({type: CAROUSEL_CURRENT_SLIDE, previousSlide: previousSlide, currentSlide: currentSlide});

export const getCurrentCarouselAnimatedText = (text) => ({type: CAROUSEL_TEXT, carouselText: text});

export const getCurrentCarouselBkgColor = (color) => ({type: CAROUSEL_BKG_COLOR, bkgColor: color});
export const getImgWidth = (width) => ({type: CAROUSEL_IMG_WIDTH, imgWidth: width});
export const getTotalSlides = (totalSlides) => ({type: CAROUSEL_TOTAL_SLIDES, totalSlide: totalSlides})
import { GET_HOMEPAGE, GET_HOMEPAGE_CAROUSEL_SLIDES } from '../helpers/types'
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


const getHomepageCarouselItems = (token) => new Promise((res, rej) => {
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
        .post(apiUrl, bodyParameters, config)
        .then(response => {
            return response.data
        })
        .then((data) => {
             res({data: data.data.allHomepageCarousels, token: token})
        })
        .catch(error => {
            throw (error);
        });
})

const getHomepageCarouselOrder = (results) => {
    return new Promise((res) => {
    results.data.map((item, index)=> {
        item.orderNumber = index + 1;
    })
    res({data: results.data, token: results.token})
})
}

 const getHomepageCarouselData = (results) => {
    const config = {
        headers: {
            Authorization: `Bearer ${results.token}`
        }
    };
    const projectsArr = results.data.filter((items) => {
        return items.listType === 'PROJECT';
    });

    return new Promise((res) => {
        let projectsCarouselArr = [];
        projectsArr.map((project) => {
            const clientName = project.clientName.client;
            const bodyParametersProject = {
                query: `query {
                    allProjects (where: {client_contains: "${clientName}"})  {
                        id,
                        title,
                        cardImage {
                            publicUrl
                        },
                        cardColor
                    }
                }`
            }
             return axios
                .post("http://localhost:3000/admin/api", bodyParametersProject, config)
                .then(response => {
                    return response.data
                })
                .then(data => {
                     data.data.allProjects[0].orderNumber = project.orderNumber;
                     projectsCarouselArr.push(data.data.allProjects[0]);
                })
        })
        res({projectsSlides: projectsCarouselArr, unmutatedData: results.data, token: results.token});

    });
}

const combineData = (results) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${results.token}`
        }
    };
    const blogsArr = results.unmutatedData.filter((items) => {
        return items.listType === 'BLOG';
    });
    return new Promise((res) => {
        let allSlides = results.projectsSlides;
    blogsArr.map((blog) => {
        const titleName = blog.blogTitle.title;
        const bodyParametersBlogs = {
            query: `query {
                    allBlogs (where: {title_contains: "${titleName}"})  {
                        id,
                        title,
                    }
                }`
        }
         axios
             .post("http://localhost:3000/admin/api", bodyParametersBlogs, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                 data.data.allBlogs[0].orderNumber = blog.orderNumber;
                allSlides.push(data.data.allBlogs[0])
            })
    })
    res(allSlides)
})
 
}
export const getHomepageCarouselSlides = (token) => {

    const request = new Promise((res) => {
        res(getHomepageCarouselItems(token))
    });
    return (dispatch) => {
        function onSuccess(data) {
            dispatch({ type: GET_HOMEPAGE_CAROUSEL_SLIDES, payload: data });
            return data;
        }

        request.then(result => {
            return getHomepageCarouselOrder(result)
        }).then((result) => {
            return getHomepageCarouselData(result)
        }).then((result) => {
            return combineData(result)
        }).then(data => {
            onSuccess(data)
        }).catch((error) => {
            console.log(error);
        })
    };
}

export const combineCarouselArrays = (blogCarousel) => ({type: COMBINE_CAROUSEL_ARRAYS, payload: blogCarousel})

export const getCurrentSlide = (previousSlide, currentSlide) => ({type: CAROUSEL_CURRENT_SLIDE, previousSlide: previousSlide, currentSlide: currentSlide});

export const getCurrentCarouselAnimatedText = (text) => ({type: CAROUSEL_TEXT, carouselText: text});

export const getCurrentCarouselBkgColor = (color) => ({type: CAROUSEL_BKG_COLOR, bkgColor: color});

export const getImgWidth = (width) => ({type: CAROUSEL_IMG_WIDTH, imgWidth: width});

export const getTotalSlides = (totalSlides) => ({type: CAROUSEL_TOTAL_SLIDES, totalSlide: totalSlides})
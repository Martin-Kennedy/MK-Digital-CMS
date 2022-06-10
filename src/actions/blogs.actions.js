
import { GET_BLOGS, GET_BLOG_ITEM, GET_NEXT_BLOG_ITEM, GET_BLOG_LANDING } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:4000/blog';

export const getBlogs = (token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
                allBlogs(sortBy: id_ASC) {
                    id,
                    author {
                      name
                    },
                    subject,
                    title,
                    cardImage {
                        publicUrl
                    },
                     mainImage {
                        publicUrl
                    },
                    imageBkgColor,
                    article, 
                    publishDate,
                    cardColor,
                    cardHeight,
                    imagePositionLeft,
                    imagePositionTop,
                    }
                }`
        }
        return axios.post(`http://${process.env.CMS_BACKEND}/admin/api`, bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                
                dispatch({
                    type: GET_BLOGS,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getNextBlogItem = (nextClient) => {
    return (dispatch) => {
        console.log(nextClient)
        dispatch({ type: GET_NEXT_BLOG_ITEM, payload: nextClient })
    }
};

export const getBlogItem = (title, token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
            allBlogs (where: {title_contains: "${title}"}) {
                id,
                    author {
                      name
                    },
                    subject,
                    title,
                    cardImage {
                        publicUrl
                    },
                     mainImage {
                        publicUrl
                    },
                    imageBkgColor,
                    article, 
                    publishDate,
                    cardColor,
                    cardHeight,
                    imagePositionLeft,
                    imagePositionTop,
            }
} `
        }
        return axios.post(`http://${process.env.CMS_BACKEND}/admin/api`, bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_BLOG_ITEM,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getBlogLanding = (token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
            allBlogLandings {
                id,
                h1,
                paragraph
            }
} `
        }
        return axios.post(`http://${process.env.CMS_BACKEND}/admin/api`, bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                let simplifiedData = data.data.allBlogLandings;
                dispatch({ type: GET_BLOG_LANDING, payload: simplifiedData })
            })
            .catch(error => {
                throw (error);
            });
    };
}


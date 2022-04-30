
import { GET_BLOGS, GET_BLOG_ITEM, GET_NEXT_BLOG_ITEM } from '../helpers/types'
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
                    article, 
                    launchDate,
                    cardColor,
                    cardHeight,
                    imagePositionLeft,
                    imagePositionTop,
                    }
                }`
        }
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
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
                    article, 
                    launchDate,
                    cardColor,
                    cardHeight,
                    imagePositionLeft,
                    imagePositionTop,
            }
} `
        }
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
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

export const getNextBlogItem = (NextId) => {
    console.log(NextId)
    return (dispatch) => {

        return axios.get(apiUrl + '/' + NextId)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_NEXT_BLOG_ITEM,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
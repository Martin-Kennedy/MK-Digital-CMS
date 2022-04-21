
import { GET_BLOGS, GET_BLOG_ITEM, GET_NEXT_BLOG_ITEM } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/blog';

export const getBlogs = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
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

export const getBlogItem = (title) => {
    return (dispatch) => {
        return axios.get(apiUrl + '?title=' + encodeURI(title))
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
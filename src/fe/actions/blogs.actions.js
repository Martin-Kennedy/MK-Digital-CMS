
import { GET_BLOGS } from '../helpers/types'
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
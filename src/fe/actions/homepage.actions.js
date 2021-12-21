
import { GET_HOMEPAGE } from '../helpers/types'
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
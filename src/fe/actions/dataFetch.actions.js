
import { GET_DATA } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/blog';

export const dataFetch = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
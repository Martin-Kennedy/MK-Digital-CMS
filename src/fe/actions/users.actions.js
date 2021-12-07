
import { GET_USERS } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/data';

export const getUsers = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_USERS,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
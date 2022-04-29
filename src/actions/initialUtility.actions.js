import {GET_TOKEN} from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/admin/api';

export const getToken = () => {
    return (dispatch) => {
        return axios({
                url: apiUrl,
                method: 'post',
                data: {
                    query: `mutation  {
                authenticate: authenticateUserWithPassword(email: "martin.kennedy.development@gmail.com", password: "Bridget618!") {
            token
            }
            } `
                }
            })
            .then(response => {
            return response.data
        })
            .then(data => {
                dispatch({type: GET_TOKEN, payload: data})
            })
            .catch(error => {
                throw(error);
            });
    };
};
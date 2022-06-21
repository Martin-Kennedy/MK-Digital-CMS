import {GET_TOKEN, ESTABLISH_SESSION} from '../helpers/types'
import axios from 'axios'

const apiUrl = process.env.CMS_BACKEND;

export const getToken = () => {
    return (dispatch) => {
        return axios({
                url: apiUrl,
                method: 'post',
                data: {
                    query: `mutation  {
                authenticate: authenticateUserWithPassword(email: "${process.env.EMAIL}", password: "${process.env.BACKENDPW}") {
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

export const establishSession = (token) => {
    const config = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        return axios({
            url: apiUrl,
            headers: config,
            method: 'post',
            data: {
                query: `query  {
                        allUsers {
                            id
                        }
                        } `
            }
        })
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({ type: ESTABLISH_SESSION, payload: true })
            })
            .catch(error => {
                throw (error);
            });
    };
};
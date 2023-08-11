import {GET_TOKEN, ESTABLISH_SESSION} from '../helpers/types'
import axios from 'axios'

const apiUrl = 'https://mk-digital-cms.herokuapp.com/admin/api';


export const getToken = () => {
    return (dispatch) => {
        return axios({
                url: apiUrl,
                method: 'post',
                data: {
                    query: `mutation  {
                        authenticate: authenticateUserWithPassword(email: "frontEndAccess@gmail.com", password: "ReadAccess") {
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
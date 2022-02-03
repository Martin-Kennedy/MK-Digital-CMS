
import { GET_PROJECTS, GET_PROJECT_ITEM } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:7000/projects';

export const getProjects = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_PROJECTS,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getProjectItem = (title) => {
    return (dispatch) => {
        return axios.get(apiUrl + '?title=' + title)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_PROJECT_ITEM,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
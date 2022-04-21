
import { GET_PROJECTS, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM } from '../helpers/types'
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

export const getNextProjectItem = (NextId) => {
    return (dispatch) => {
        
        return axios.get(apiUrl + '/' + NextId)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: GET_NEXT_PROJECT_ITEM,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const getProjectItem = (client) => {
    
    return (dispatch) => {
        return axios.get(apiUrl + '?client=' + client)
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
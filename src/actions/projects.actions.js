
import { GET_PROJECTS, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:7000/projects';

const apiUrl1 = 'http://localhost:3000/admin/api';
export const getProjects = () => {
    return (dispatch) => {
        return axios({
            url: apiUrl1,
            method: 'post',
            data: {
                query: `query {
            allProjects {
                id,
                client,
                title,
                cardImage {
                    publicUrl
                },
                cardColor,
                cardHeight,
                imagePositionLeft,
                imagePositionTop,
                url,
                externalLink,
                expertise,
                subject,
                heroImage {
                publicUrl
                },
                launchDate,
                aboutClient,
                whatWeDid,
                image1 {
                    publicUrl
                },
                image2FullWidth {
                    publicUrl
                },
                videoHolderImage {
                    publicUrl
                },
                youtubeEmbedCode,
                youtubeListCode,
                image4 {
                    publicUrl
                },
                iphoneImageDarkBackground {
                    publicUrl
                },
                iphoneImageColorBackground {
                    publicUrl
                },
                resultMetric1Description,
                resultMetric1Value,
                resultMetric2Description,
                resultMetric2Value
            }
} `
            }
        })
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
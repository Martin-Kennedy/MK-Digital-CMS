
import { GET_PROJECTS, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM } from '../helpers/types'
import axios from 'axios'


const apiUrl = 'http://localhost:3000/admin/api';
export const getProjects = () => {
    return (dispatch) => {
        return axios({
            url: apiUrl,
            method: 'post',
            data: {
                query: `query {
                allProjects(sortBy: id_ASC) {
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
                    expertise, 
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

export const getNextProjectItem = (NextCLient) => {
    return (dispatch) => {
        
                dispatch({
                    type: GET_NEXT_PROJECT_ITEM,
                    payload: NextCLient
                })
            }
    };

export const getProjectItem = (client) => {
    
    return (dispatch) => {
        console.log(client)
        return axios({
            url: apiUrl,
            method: 'post',
            data: {
                query: `query {
            allProjects (where: {client_contains: "${client}"}) {
                id,
                client,
                title,
                cardImage {
                    publicUrl
                },
                cardColor,
                buttonColor,
                fiftyVwBkgColor,
                cardHeight,
                imagePositionLeft,
                imagePositionTop,
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
                resultMetric2Value,
                resultFullText
            }
} `
            }
        })
            .then(response => {
                return response.data
            })
            .then(data => {
                let simplifiedData = data.data.allProjects;
                dispatch({
                    type: GET_PROJECT_ITEM,
                    payload: simplifiedData
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};
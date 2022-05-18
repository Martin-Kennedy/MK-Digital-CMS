import { GET_PROJECTS, GET_PROJECT_ITEM, GET_NEXT_PROJECT_ITEM, GET_PROJECT_LANDING } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:3000/admin/api';
export const getProjects = (token) => {

    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
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
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
            return response.data
        })
            .then(data => {
                dispatch({type: GET_PROJECTS, payload: data})
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const getNextProjectItem = (nextClient) => {
    return (dispatch) => {
        console.log(nextClient)
        dispatch({ type: GET_NEXT_PROJECT_ITEM, payload: nextClient})
    }
};

export const getProjectItem = (client, token) => {

    

    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
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
                videoEmbedUrl,
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
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {
                
                let simplifiedData = data.data.allProjects;
                dispatch({type: GET_PROJECT_ITEM, payload: simplifiedData})
            })
            .catch(error => {
                throw(error);
            });
    };
};


export const getProjectLanding = (token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
            allProjectLandings {
                id,
                h1,
                paragraph
            }
} `
        }
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {

                let simplifiedData = data.data.allProjectLandings;
                dispatch({ type: GET_PROJECT_LANDING, payload: simplifiedData })
            })
            .catch(error => {
                throw (error);
            });
    };
}

import { GET_ABOUT } from '../helpers/types'
import axios from 'axios'

const apiUrl = 'http://localhost:4000/blog';

export const getAbout = (token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
                allAbouts(sortBy: id_ASC) {
                    id,
                    author {
                      name
                    },
                    aboutHeroLineOne,
                    aboutHeroLineTwo,
                    aboutHeroLineThree,
                    introBlurbOne,
                    introBlurbTwo,
                    aboutInitialDescription,
                    aboutSectionOneShort,
                    aboutSectionOneLong,
                    aboutSectionTwoLong, 
                    dragComponentText,
                    servicesInitialDescription,
                    serviceOneName,
                    serviceOneValue,
                    serviceOneDescription,
                    serviceOneListOne,
                    serviceOneListTwo,
                    serviceTwoName,
                    serviceTwoValue,
                    serviceTwoDescription,
                    serviceTwoListOne,
                    serviceTwoListTwo,
                    parallaxVideoEmbed,
                    parallaxVideoPlaylist,
                    }
                }`
        }
        return axios.post("http://localhost:3000/admin/api", bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {

                dispatch({
                    type: GET_ABOUT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};



import { GET_ABOUT } from '../helpers/types'
import axios from 'axios'

const apiUrl = "https://mk-digital-cms.herokuapp.com/admin/api";

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
                    }
                }`
        }
        return axios.post(apiUrl, bodyParameters, config)
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


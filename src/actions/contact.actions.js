
import { GET_CONTACT } from '../helpers/types'
import axios from 'axios'


export const getContact = (token) => {
    return (dispatch) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            query: `query {
                allContacts {
                    id,
                    h1,
                    h2,
                    }
                }`
        }
        return axios.post(process.env.CMS_BACKEND, bodyParameters, config)
            .then(response => {
                return response.data
            })
            .then(data => {

                dispatch({
                    type: GET_CONTACT,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};


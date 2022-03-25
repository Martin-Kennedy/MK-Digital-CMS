import React, { useEffect, useState, Fragment} from 'react';
import {Button, Modal} from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, connect } from "react-redux";
import { GET_GEO_LOCATION} from '../../helpers/types'

const mapDispatchToProps = dispatch => ({
        getCloseSurfSpots: closeSurfSpots => dispatch(getCloseSurfSpots(closeSurfSpots)),
})

const mapStateToProps = state => {
    return {
        surf: {
            geoLocation: state.surf.geoLocation
        }
    }
}


const GeoLocationModal = (props) => {
    const [show, setShow] = useState(false);
    const [geoLocation, setGeoLocation] = useState(props.surf.geoLocation);

    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setShow(true);
        setGeoLocation(props.geoLocation)
    }, [geoLocation]);

    return (
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                <Button variant="primary" onClick={navigator
                    .geolocation
                    .getCurrentPosition(function (position) {
                        console.log('this is runnning')
                        let latitude = position.coords.latitude;
                        let longitude = position.coords.longitude;
                        const coords = {
                            latitude: latitude,
                            longitude: longitude
                        }
                        console.log(coords)
                        dispatch({
                            type: GET_GEO_LOCATION,
                            payload: coords
                        });
                    })}>
                        Allow Geolocation
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(GeoLocationModal);
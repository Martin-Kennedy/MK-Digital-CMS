import {IS_INTERSECTING} from '../helpers/types';

export const getIntersectingState = (isIntersecting) => ({
    type: IS_INTERSECTING,
    isIntersecting: isIntersecting
})
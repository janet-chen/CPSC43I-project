import {
    FETCH_MEDIA_REQUEST,
    FETCH_MEDIA_SUCCESS,
    FETCH_MEDIA_FAILURE,
    SAVE_MEDIA_REQUEST,
    SAVE_MEDIA_SUCCESS,
    SAVE_MEDIA_FAILURE
} from './mediaTypes.js';

import Unsplash, { toJson } from 'unsplash-js';
const APP_ACCESS_KEY = 'adYDaJCisGClWz_PnSuJJiuzl1hItt3kKGxKLePeYPA';
const SECRET_KEY = 'KFaS1rVbg4l9G1OJ1TSVCL2mYnDMl9c-5wi8puO2Bjo';
const unsplash = new Unsplash(
  {
    accessKey: APP_ACCESS_KEY,
    secret: SECRET_KEY
  }
);


const fetchMediaRequest = () => {
    return {
        type: FETCH_MEDIA_REQUEST
    }
}

const fetchMediaSuccess = content => {
    return {
        type: FETCH_MEDIA_SUCCESS,
        payload: content
    }
}

const fetchMediaFailure = error => {
    return {
        type: FETCH_MEDIA_FAILURE,
        payload: error
    }
}

export const fetchMedia = destination => {
    return (dispatch) => {
        dispatch(fetchMediaRequest);
        unsplash.search.photos(destination, 1, 12, { orientation: 'landscape' })
            .then(toJson)
            .then(json => {
                // let extractUrls = function ({ urls }) { return { urls }; };
                // const imageSubset = json.results.slice(0, 12);
                // const urls = imageSubset.map(imgObject => extractUrls(imgObject));
                dispatch(fetchMediaSuccess({...json, query: destination}));
            })
            .catch(error => {
                dispatch(fetchMediaFailure(error.message));
            });
    }
}

const saveMediaRequest = () => {
    return {
        type: SAVE_MEDIA_REQUEST
    }
}
const saveMediaSuccess = content => {
    return {
        type: SAVE_MEDIA_SUCCESS,
        payload: content
    }
}

const saveMediaFailure = error => {
    return {
        type: SAVE_MEDIA_FAILURE,
        payload: error
    }
}

export const saveMedia = media => {
    return (dispatch) => {
        dispatch(saveMediaRequest);
        /* save id to mongoDB */
        dispatch(saveMediaSuccess(media));
    }
}
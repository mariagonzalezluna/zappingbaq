import {  VISOR  } from '../types';

export const visorAction = (datos) => async (dispatch) => {

    dispatch({
        type:  VISOR,
        payload: datos
    })
}
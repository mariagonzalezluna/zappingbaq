import {  USERDATA  } from '../types';

export const userDataAction = (datos) => async (dispatch) => {

    dispatch({
        type:  USERDATA,
        payload: datos
    })
}
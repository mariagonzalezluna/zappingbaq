import { VISOR } from '../types/';

const INITIAL_STATE = {}

export default ( state = INITIAL_STATE, action ) => {
    switch (action.type){
        case VISOR :
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
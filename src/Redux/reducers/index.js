import { combineReducers } from "redux";
import dataUserReducer from './userDataReducer';
import visor from './visroReducer';

export default combineReducers({
    daraUser: dataUserReducer,
    visorReducer: visor
});
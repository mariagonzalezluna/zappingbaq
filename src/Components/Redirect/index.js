import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect, Link, useHistory} from 'react-router-dom';
const Redirection = (props) => {
    let history = useHistory();

    useEffect( () => {
        if(Object.keys(props.visorReducer).length >= 1) {
            if( props.visorReducer.salida === "CONOCIDO" ){
                history.push("/gratulations")
            }else if(props.visorReducer.salida === "NUEVO"){
                history.push("/complete-info")
            }
        }else{
            history.push("/welcome")
        }
    },[]);

    return(
        <div className="text-center p-relative pop">
            <div className="contenLoading">
                <div className="loading">
                    <div className="p-3 w-100">
                        <h6>Cargando...</h6>
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (store) => store;

export default connect(mapStateToProps, {})(Redirection);
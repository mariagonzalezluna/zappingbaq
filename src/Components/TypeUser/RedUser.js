import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import rojo from '../../assets/img/rojo.svg';
import avatar from '../../assets/img/tiketBoot.svg';

const RedUser = (props) => {
    let history = useHistory();
    /*
    useEffect( () => {
        if(Object.keys(props.visorReducer).length == 0) {
            history.push("/welcome")
        }
    },[]);
    */

    const {primer_nombre} = props.visorReducer;
    
    return(
        <div className="p-3">
            <div className="text-center" >
              <img src={avatar} alt="botHello" width="50%" className="my-4"/>
                <h5 className="title">Hola {primer_nombre}</h5>
                <p className="contenText">
                    En el momento no tenemos un crédito para ti, pero no te preocupes, puedes comprar con otros medios de pago y recibirás hasta el 20% de descuento :)
                </p>
           
                
                <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                    <img src={rojo} width="100%" />
                </div>
                <p className="termMIni"><a href="https://terminosycondiciones.jamar.co/condiciones-del-beneficio-20-de-descuento-cliente-no-viables/" target="_blank">Aplican términos y condiciones *</a></p>
                <button className='ROJO btn w-100 rounded-pill text-white btnAnimated'>
                    QUIERO MI CUPO
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = state => state;

export default  connect(mapStateToProps, {})(RedUser);
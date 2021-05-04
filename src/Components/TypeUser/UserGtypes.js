import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    useParams,
    useHistory
  } from "react-router-dom";
import avatar from '../../assets/img/tiketBoot.svg';
import {whatsappAPi} from '../../Api/whatsappAPI';
import amarillo from '../../assets/img/oro.svg';
import naranja from '../../assets/img/naranja.svg';
import rojo from '../../assets/img/rojo.svg';

function UserGtypes(props){
    let {type} = useParams();
    let history = useHistory();

    const {first_name} = props.daraUser;
    useEffect( () => {
        if(Object.keys( props.daraUser).length == 0) {
            history.push("/welcome")
        }else{
            whatsappAPi(props.visorReducer, props.daraUser)
        }
    },[]);  
    
    const hableWatsapp = () => {
        window.location.href = "https://wa.me/573222490481"
    };

    return(
        <div className="container margin text-center p-relative">
            <div className="text-center" >
                <img src={avatar} alt="botHello" className="mb-4"/>
                <h5 className="title">Hola, {first_name}</h5>
                { type == "G3" ?
                    <>
                        <div style={{ marginBottom : '50px' }} >
                            <p className="contenText">¡Creemos en ti y en tus sueños! Por eso te hemos otorgado un cupo pre aprobado con <b style={{ color: "#529BFF" }} >CREDIJAMAR</b>, para que inicies tu vida crediticia con nosotros.</p>
                            <p className="contenText">Úsalo ya con este beneficio en la feria del crédito:</p>
                        </div>
                        <button className={ 'AZUL  btn w-100 rounded-pill text-white btnAnimated'}
                            onClick={hableWatsapp}
                        >
                            ¡ACTIVALO YA POR WHATSAPP!
                        </button>
                    </>
                :  type == "G1" ? 
                
                <>
                    <div>
                        <p className="contenText">¡Creemos en ti, en tus metas y en tus ganas de crecer! por esto, te hemos pre aprobado un cupo de crédito con <b style={{ color: "#FFC152" }}>CREDIJAMAR</b> para que estrenes en tu hogar.</p>
                        <p className="contenText">Úsalo ya con este beneficio en la feria del crédito:</p>
                    </div>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={amarillo}
                            width="100%"
                            />
                    </div>
                    <button className={ 'AMARILLO  btn w-100 rounded-pill text-white btnAnimated'}
                        onClick={hableWatsapp}
                    >
                        ¡ACTIVALO YA POR WHATSAPP!
                    </button>
                </>

                : 
                type == "G2" ? 
                
                <>
                    <div>
                        <p className="contenText">¡Creemos en ti, en tus metas y en tus ganas de crecer! por esto, te hemos pre aprobado un cupo de crédito con <b style={{ color: "#FFC152" }}>CREDIJAMAR</b> para que estrenes en tu hogar.</p>
                        <p className="contenText">Úsalo ya con este beneficio en la feria del crédito:</p>
                    </div>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={amarillo}
                            width="100%"
                            />
                    </div>
                    <button className={ 'AMARILLO  btn w-100 rounded-pill text-white btnAnimated'}
                        onClick={hableWatsapp}
                    >
                        ¡ACTIVALO YA POR WHATSAPP!
                    </button>
                </>

                :
                type == "G5" ? 
                
                <>
                    <div>
                        <p className="contenText">
                        ¡En esta ocasión no tenemos un crédito para ti. Pero no te preocupes te tenemos un regalo especial para que compres de contado.
                        </p>
                    </div>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={rojo }
                            width="100%"
                            />
                    </div>
                    <p className="termMIni"><a href="https://terminosycondiciones.jamar.co/condiciones-del-beneficio-20-de-descuento-cliente-no-viables/" target="_blank">Aplican términos y condiciones *</a></p>
                    <a className="ROJO  btn w-100 rounded-pill text-white btnAnimated" target="_blank" href="https://www.jamar.com/">
                        IR A JAMAR.COM
                    </a>
                </>

                :null}
               
            </div>
        </div>
    )
};

const mapStateToProps = state => state;

export default  connect(mapStateToProps, {}) (UserGtypes);
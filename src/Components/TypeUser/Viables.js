import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { Link , useHistory} from 'react-router-dom';
import amarillo from '../../assets/img/oro.svg';
import azul from '../../assets/img/ejemplar.svg';
import naranja from '../../assets/img/naranjaTiket.png';
import rojo from '../../assets/img/rojo.svg';
import avatar from '../../assets/img/tiketBoot.svg';
import {whatsappAPi} from '../../Api/whatsappAPI';
import Endpoint from "../../Api/endpoints";


function Viables(props){
    console.log(props.visorReducer);

    const { viable } = props.visorReducer
    const ps_responseclob  = Object.keys(props.visorReducer).length >= 1 ? props.visorReducer.result. ps_responseclob : null ;
    const dataFinals =  ps_responseclob ? ps_responseclob.data[0] : null;

    console.log(dataFinals);

    const hableWatsapp = () => {
        whatsappAPi(props.visorReducer, props.daraUser)
        .then(data => {
            console.log(data);
            window.location.href = "https://wa.me/573222490481"
        })
        .catch( err => {
            console.log(err)
        })
    };
    return(
        <div className="container margin text-center p-relative">

            <div className="text-center" >
                <img src={avatar} alt="botHello" className="mb-4"/>
                <h5 className="title">Hola, {props.visorReducer.primer_nombre}</h5>
            </div>
            { viable == "AMARILLO" || viable == "VERDE" ?
                <>
                    <p className="contenText">
                        Tenemos excelentes noticias para ti, YA cuentas con tu cupo de <b>CREDITO CREDIJAMAR</b>. 
                    </p>
                    <p className="contenText">Y  los mejor es que puedes usarlo para que estrenes lo que desee</p>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={azul} width="100%" />
                    </div>
                    <button className={ 'btn-primary  btn w-100 rounded-pill text-white btnAnimated'}
                            onClick={hableWatsapp}
                    >
                        ¡ACTIVALO YA POR WHATSAPP!
                    </button>
                </>
            : 
            viable == "ROJO" ? 
            <>
                <p className="contenText">
                ¡En esta ocasión no tenemos un crédito para ti. Pero no te preocupes te tenemos un regalo especial para que compres de contado.
                </p>
                <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                    <img src={rojo} width="100%" />
                </div>
                <p className="termMIni"><a href="https://terminosycondiciones.jamar.co/condiciones-del-beneficio-20-de-descuento-cliente-no-viables/" target="_blank">Aplican términos y condiciones *</a></p>
                <a className="ROJO  btn w-100 rounded-pill text-white btnAnimated" target="_blank" href="https://www.jamar.com/">
                    IR A JAMAR.COM
                </a>
            </>
            :
            dataFinals != null ?
            dataFinals.CALF_DATACREDITO == "RED" || dataFinals.CALF_DATACREDITO == "EXD" || dataFinals.CALF_DATACREDITO == "BUD" || dataFinals.CALF_DATACREDITO == "R5D" ?
                <>
                    <p className="contenText">
                        Tenemos excelentes noticias para ti, YA cuentas con tu cupo de <b>CREDITO CREDIJAMAR</b>. 
                    </p>
                    <p className="contenText">Y  los mejor es que puedes usarlo para que estrenes lo que desee</p>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={azul} width="100%" />
                    </div>
                    <button className={ 'btn-primary  btn w-100 rounded-pill text-white btnAnimated'}
                            onClick={hableWatsapp}
                    >
                        ¡ACTIVALO YA POR WHATSAPP!
                    </button>
                </>
            :  
            dataFinals.CALF_DATACREDITO == "NVD" ?
                <>
                    <p className="contenText">
                    ¡En esta ocasión no tenemos un crédito para ti. Pero no te preocupes te tenemos un regalo especial para que compres de contado.
                    </p>
                    <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                        <img src={rojo} width="100%" />
                    </div>
                    <p className="termMIni"><a href="https://terminosycondiciones.jamar.co/condiciones-del-beneficio-20-de-descuento-cliente-no-viables/" target="_blank">Aplican términos y condiciones *</a></p>
                    <a className="ROJO  btn w-100 rounded-pill text-white btnAnimated" target="_blank" href="https://www.jamar.com/">
                        IR A JAMAR.COM
                    </a>
                </>
            : 
            <>
                <p className="contenText">
                ¡En esta ocasión no tenemos un crédito para ti. Pero no te preocupes te tenemos un regalo especial para que compres de contado.
                </p>
                <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                    <img src={rojo} width="100%" />
                </div>
                <p className="termMIni"><a href="https://terminosycondiciones.jamar.co/condiciones-del-beneficio-20-de-descuento-cliente-no-viables/" target="_blank">Aplican términos y condiciones *</a></p>
                <a className="ROJO  btn w-100 rounded-pill text-white btnAnimated" target="_blank" href="https://www.jamar.com/">
                    IR A JAMAR.COM
                </a>
            </>
            :
            <a className="ROJO  btn w-100 rounded-pill text-white btnAnimated" target="_blank" href="https://www.jamar.com/">
                IR A JAMAR.COM
            </a> }
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(Viables);
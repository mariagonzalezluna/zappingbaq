import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { Link , useHistory} from 'react-router-dom';
import amarillo from '../../assets/img/oro.svg';
import azul from '../../assets/img/ejemplar.svg';
import naranja from '../../assets/img/naranjaTiket.png';
import rojo from '../../assets/img/rojo.svg';
import avatar from '../../assets/img/tiketBoot.svg';
import {whatsappAPi} from '../../Api/whatsappAPI';

function Conocido  (props) {
    let history = useHistory();

  /*   useEffect( () => {
        if(Object.keys(props.visorReducer).length == 0) {
            history.push("/welcome")
        }
    },[]); */

    const formatNumber = {
        separador: ".",
        sepDecimal: ',',
        formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
        }
    };
    
    const {primer_nombre,} = props.visorReducer;
    console.log(props.visorReducer);
    const hableWatsapp = () => {
        whatsappAPi(props.visorReducer, props.daraUser)
        .then(data => {
            console.log(data);
            window.location.href = "https://wa.me/573222490481"
        })
        .catch( err => {
            console.log(err)
        })
    }
    console.log(props.visorReducer.segmento);

    return(

        <div className="container margin text-center p-relative">
            <div className="text-center" >
                    <img src={avatar} alt="botHello" width="50%" className="mb-4"/>
                    <h5 className="title">Hola, {primer_nombre}</h5>
                    { props.visorReducer.segmento === "CLIENTE NUEVO" || props.visorReducer.segmento === "EJEMPLAR" || props.visorReducer.segmento === "PEJEMPLAR" || props.visorReducer.segmento === "PRENTABLE" || props.visorReducer.segmento === "RENTABLE" ?
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
                        props.visorReducer.segmento === "ORO" ?
                        <>
                            <p className="contenText">
                            Ya eres un cliente <b style={{ color: "#FFC152" }}>ORO!</b>  y lo mejor es que tu cupo esta <b>APROBADO!</b>
                            </p>
                           
                            <p className="contenText">Disfrútalo ya con este beneficio!</p>
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
                    props.visorReducer.segmento === "PORO" ?
                        <>
                            <p className="contenText">
                            Tenemos excelente noticias para ti, estas a un paso de ser <b style={{ color: "#FFC152" }}> CLIENTE ORO</b>.
                            </p>
                            <p className="contenText">
                            Y los mejor es que tu cupo esta <b> !APROBADO!</b>
                            </p>
                            <div className="contenCUpo pr-3 animated bounceInLeft" id="cupoConten">
                                <img src={amarillo} width="100%" />
                            </div>
                            <button className={ 'AMARILLO  btn w-100 rounded-pill text-white btnAnimated'}
                                onClick={hableWatsapp}
                            >
                                ¡ACTIVALO YA POR WHATSAPP!
                            </button>
                         </>
                    : 
                    props.visorReducer.segmento === "OTROS CREDITO" || props.visorReducer.segmento === "POTROS CREDITO" ?
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
                    null
                    }
                </div>
        </div>
    )
}

const mapStateToProps = (store) => store ;
export default  connect(mapStateToProps, {})(Conocido);
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import avatar from '../../assets/img/avatarTerms.svg'
import { connect } from 'react-redux';



const Terminos = (props) => {
    let history = useHistory();
    useEffect( () => {
        if(Object.keys(props.daraUser).length === 0) {
            history.push("/welcome")
        }
    },[]);

    return(
            <div className="container margin text-center">
                <img src={avatar} width="60%" className="mb-5 mt-3" />
                <h3 className="card-title terTitle text-center mb-3">
                    Los amigos guardan los secretos y se protegen entre ellos <span role="img" aria-label="sheep"> 🤫 </span>
                </h3>
                <p className="texTerm mb-5 text-left">
                    Acepta los <a href="https://www.jamar.com/pages/terminos-y-condiciones-de-garantias-y-servicios#section-terminos-satisfaccion" target="_blank" className="linkTerm">
                    términos y condiciones</a> para continuar,
                    te prometo que tus datos los guardaré como un secreto
                </p >
                <p className="texTerm">Siguiente y acepto términos condiciones</p>
                <Link to={`/complete-info`}>
                    <button className="btn btn-primary w-100 rounded-pill">SIGUIENTE</button>
                </Link>
            </div>
    )
}
const mapStateToProps = (store) =>  store;
export default connect(mapStateToProps, {})(Terminos);
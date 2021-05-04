import Axios from 'axios';
import Endpoint from "./endpoints";

export function whatsappAPi (info, dataExtra){
    fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/whatsapp`, {method: 'PUT'});
    var data = new FormData();
    data.append("sagicc_token", "f6ea662c9532fe18fb70ac4740722860");
    data.append("primer_apellido", info.primer_apellido);
    data.append("segundo_apellido", info.segundo_apellido);
    data.append("primer_nombre", info.primer_nombre);
    data.append("segundo_nombre", info.segundo_nombre);
    data.append("nro_documento", info.n_ide);
    data.append("tipo_documento", "CC");
    data.append("telefono", dataExtra.cellphone);

    return new Promise( (resolve, reject) => {
        Axios.post('https://jamar.sagicc.co/api/v2/canal-website/website-callback', data)
        .then( data => resolve(data) )
        .catch(e => reject(e))
    } )
}
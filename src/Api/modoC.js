import Axios from 'axios';
import Endpoint from './endpoints';

export function modoCRequest (identification, clientId){
    localStorage.setItem("clientId", clientId);
    return new Promise( ( resolve, reject ) => {
        Axios.get(`${Endpoint.tarjetizacionColApi}/JA/client/${identification}?internal_id=${clientId}`)
        .then(data => {
            resolve(data)
        } )
        .catch( err => reject(err))
    } )
}

const isProd = true;

const tarjetizacionColApiPrd = 'uoc9e528ik';
const credijamarApiPrd = '59o1es3b63';

const tarjetizacionColApiDev = '4uxcuyvjzf';
const credijamarApiDev = 'uzv9iixunb';

const schema = 'https://';
const awsApi = '.execute-api.us-east-1.amazonaws.com/api/v1';

export interface Endpoints {
    tarjetizacionColApi: string;
    credijamarApi: string;
}

const Endpoint: Endpoints = {
    tarjetizacionColApi: schema + (isProd ? tarjetizacionColApiPrd : tarjetizacionColApiDev) + awsApi,
    credijamarApi: schema + (isProd ? credijamarApiPrd : credijamarApiDev) + awsApi
}

export default Endpoint;

// https://uoc9e528ik.execute-api.us-east-1.amazonaws.com/api/v1 --> app_id -> TarColApi Prod
// https://4uxcuyvjzf.execute-api.us-east-1.amazonaws.com/api/v1 --> app_id -> TarColApi Dev!!! Se utiliza para consultar ocupaciones y tipos de vias
// https://uzv9iixunb.execute-api.us-east-1.amazonaws.com/api/v1 --> Credijamar Dev!!! Solo se utiliza para consultar dep, ciu y barrios. La de prod es 59o1es3b63

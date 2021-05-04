import React, {useState, useEffect} from 'react';
import {Grid, Container, Select, MenuItem , TextField, FormControl, InputLabel, Dialog, DialogTitle, LinearProgress} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import boot from '../../assets/img/bootQuestionTwo.svg';
import { useHistory} from 'react-router-dom';
import Endpoint from '../../Api/endpoints';

function StepThree (props){
    let history = useHistory();

    const [calle, setCalle] = useState("");
    const [city, setCity] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [barrioSelect, setBarrioSelect] = useState("");

    const [ocupaciones, setOcupaciones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [cities, setcities] = useState([]);
    const [barios, setBarios] = useState([]);
    
    const [loading, serLoading] = useState(false);

    function getOcupaciones(){
        fetch(`${Endpoint.tarjetizacionColApi}/JA/occupations`)
        .then(data => data.json())
        .then(data => {
            setOcupaciones(data)
        }).catch(e => {
            console.log(e)
        })
    }
    function getDepartamentos(){
        fetch(`${Endpoint.credijamarApi}/JA/departments`)
        .then(data => data.json())
        .then(data => {
            let arrayDepartaments = data.filter( i => i.codigo != "11" );
            setDepartamentos(arrayDepartaments);
        }).catch(e => {
            console.log(e)
        })
    }
    function getCiudad(dep){
        fetch(`${Endpoint.credijamarApi}/JA/departments/${dep}/cities`)
        .then(data => data.json())
        .then(data => {
          
            setcities(data);
        }).catch(e => {
            console.log(e)
        })
    }
    function getbarios(e){
        fetch(`${Endpoint.credijamarApi}/JA/departments/${departamento}/cities/${e}/neigborhoods`)
        .then(data => data.json())
        .then(data => {
            setBarios(data);
        }).catch(e => {
            console.log(e)
        })
    }
    useEffect( () => {
        getOcupaciones()
        getDepartamentos()
    }, [] );

    function onBlur(e){
        let obj = {
            "department": departamento,
            "city": city,
            "occupation": calle,
            "neighborhood": barrioSelect
        }
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/form23`, {method: 'PUT', body: JSON.stringify(obj)});
    }

    const hableSave = async () => {
        serLoading(true);
        let objs = props.data;
        let obj = {
            "department": departamento,
            "city": city,
            "occupation": calle,
            "neighborhood": barrioSelect
        }
        let objsFinal = {...objs, ...obj}
        let cc = objsFinal.cedula;
        delete objsFinal.cedula;
        objsFinal.internal_id = localStorage.getItem("clientId");

        function saveUsers(){
            fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${cc}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objsFinal)
            })
            .then( data => data.json() )
            .then( info => {
                console.log(info);
                if(info.errorCode == null){  
                    history.push("/user/gtypes/" + info.suggestedAction );
                }else{
                    history.push("/user/red");
                }
            }).catch(e => {
                history.push("/user/red");
            })

        }
        saveUsers();

        console.log(objsFinal);
    };

    return(
        <Container maxWidth="sm" className="containerQuestion">
            <div className="imgBott">
                <img src={boot}/>
            </div>
        
        <h1 className="title">Casi terminamos aun me hacen falta estos datos y listo</h1>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        value={departamento}
                        onChange={e=> {
                            setDepartamento(e.target.value)
                            getCiudad(e.target.value);
                        } }
                        label="Departamento"
                        onBlur={e => onBlur(e)}
                    >
                        { 
                            departamentos.length >= 1 ? 
                            departamentos.map(i => <MenuItem value={i.codigo} key={i.codigo}>{i.descripcion.toUpperCase()}</MenuItem> )
                            :  
                            <MenuItem value="">Cargando...</MenuItem>
                        }
                       
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Ciudad</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        value={city}
                        onChange={e=> {
                            setCity(e.target.value);
                            getbarios(e.target.value);
                        }}
                        label="Ciudad"
                        onBlur={e => onBlur(e)}
                    >
                        { cities.length >= 1 ?
                        cities.map( i =>  <MenuItem value={i.codigo} key={i.codigo} >{i.descripcion.toUpperCase()}</MenuItem> )
                        : <MenuItem value="Calle">Cargando...</MenuItem> }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <Autocomplete
                        id="combo-box-demo"
                        options={barios}
                        getOptionLabel={(option) => {
                            setBarrioSelect(option.codigo)
                            return option.descripcion.toUpperCase()
                        }}
                        style={{ width: '100%' }}
                        onBlur={e => onBlur(e)}
                        renderInput={(params) => <TextField {...params} label="Barrio" variant="outlined" />}
                    />
                 
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Ocupación</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        value={calle}
                        onChange={e=> setCalle(e.target.value)}
                        label="Ocupación"
                        onBlur={e => onBlur(e)}
                    >
                      
                        {ocupaciones.length >= 1 ?
                            ocupaciones.map(i => <MenuItem value={i.cod_ocu} key={i.cod_ocu}>{i.des_ocu.toUpperCase()}</MenuItem>)
                        : <MenuItem value="">Cargando...</MenuItem>}
                        
                        
                    </Select>
                </FormControl>
            </Grid>
            
            
            <Grid item xs={12} >
                <button
                    disabled={ calle != ""  && city != "" && departamento != "" ? false : true }
                    type="submit"
                    className="btn btn-primary w-100 mb-4 " id="bnNext"
                    onClick={hableSave}>
                    Siguiente
                </button>
            </Grid>
        </Grid>
        <Dialog open={loading}>
            <LinearProgress color="secondary" />
            <DialogTitle >Procesando...</DialogTitle>
        </Dialog>
    </ Container>
    )
};

export default StepThree;
import React, {useState, useEffect} from 'react';
import {Grid, TextField, Container, Select, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import boot from '../../assets/img/bootQuestionTwo.svg';
import locationIcon from '../../assets/img/locationIcon.svg';
import Endpoint from '../../Api/endpoints';

function StepTwo(props){

    const [calle, setCalle] = useState("");
    const [dirOne, setdirOne]= useState("");
    const [num, setNum] = useState("");
    const [complete, setComplete] = useState("");
    
    const [typeSender, setTypeSender] = useState('');
    const [completeSender, setCompleteSender] = useState("")

    const [typeHouse, setTypeHouse] = useState('');
    const [completeHouse, setCompleteHouse] = useState("");

    const [typeCalle, setTypeCalle] = useState([]);
    const [typeCuadra, setTypeCuadra] = useState([]);
    const [typeHouses, setTypeHouses] = useState([]);

    function onBlur(e){
        let obj = {
            "address":  `${calle+' '}${' '+dirOne + ' '}${' '+num+' '}${complete?' '+complete+' ':''}${typeSender ? ' '+typeSender+' ': ''}${completeSender ?' '+completeSender+' ' :''}${typeHouse?' '+typeHouse+' ' : '' }${completeHouse ? ' '+completeHouse : ''}`
        }
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/form22`, {method: 'PUT', body: JSON.stringify(obj)});
    }

    const hableSave = () => {
        let objs = {
        "address":  `${calle+' '}${' '+dirOne + ' '}${' '+num+' '}${complete?' '+complete+' ':''}${typeSender ? ' '+typeSender+' ': ''}${completeSender ?' '+completeSender+' ' :''}${typeHouse?' '+typeHouse+' ' : '' }${completeHouse ? ' '+completeHouse : ''}`
        }
        console.log(objs);
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/form22/complete`, {method: 'PUT'});
        props.save(objs);
        props.next(); 
    };

    function getData(){
        fetch(`${Endpoint.tarjetizacionColApi}/JA/way-type`).then(data => data.json())
        .then(data => {
            setTypeCalle(data)
        }).catch(e => {
            console.log(e)
        });

        fetch(`${Endpoint.tarjetizacionColApi}/JA/int1-type`).then(data => data.json())
        .then(data => {
            setTypeCuadra(data)
        }).catch(e => {
            console.log(e)
        });

        fetch(`${Endpoint.tarjetizacionColApi}/JA/int3-type`).then(data => data.json())
        .then(data => {
            setTypeHouses(data)
        }).catch(e => {
            console.log(e)
        });
    }
    useEffect( () => {
        getData()
    }, [] );

    return(
        <Container maxWidth="sm" className="containerQuestion">
            <div className="imgBott">
                 <img src={boot}/>
            </div>
        
            <h1 className="title">Ahora el turno es para tu hogar, ¿dónde vives?</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <p className="direciontComplete">
                        <img src={ locationIcon }/>
                        { calle } {dirOne} { num ? '#' + num :  '' } {complete ? '-' + complete : ''} {typeSender ? ', ' + typeSender : ''} {completeSender}
                        { typeHouse ? ', ' + typeHouse : '' } {completeHouse}
                    </p>
                    
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Seleccionar</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            value={calle ? calle : "uno"}
                            onChange={e=> setCalle(e.target.value)}
                            label="Seleccionar"
                            onBlur={e => onBlur(e)}
                        >
                            { typeCalle.length >= 1 ?
                                typeCalle.map(i => {
                                        return <MenuItem value={i.cod} key={i.cod}>{i.descripcion}</MenuItem>
                                    }
                                )
                            : <MenuItem value="" disabled>
                                <em className="example">CARGANDO...</em>
                            </MenuItem>
                            }
                            <MenuItem value="uno" disabled>
                                <em className="example">Ej: Calle, carrera o avenida…</em>
                            </MenuItem>
                            
                            
                        </Select>
                    </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={4}  className="extraDirection">
                                <TextField
                                    fullWidth
                                    onChange={e=> setdirOne(e.target.value)}
                                    value={dirOne}
                                    variant="outlined"
                                    id="firsName"
                                    name="firsName"
                                    type="text"
                                    className="form-primary"
                                    onBlur={e => onBlur(e)}
                                />
                                <h5>#</h5>
                            </Grid>
                        
                            <Grid item xs={4} className="extraDirection">
                                <TextField
                                    fullWidth
                                    onChange={e=> setNum(e.target.value)}
                                    value={num}
                                    variant="outlined"
                                    id="firsName"
                                    name="firsName"
                                    type="text"
                                    className="form-primary"
                                    onBlur={e => onBlur(e)}
                                />
                                <h5>-</h5>
                            </Grid>
                            
                            <Grid item xs={4}  >
                                <TextField
                                    fullWidth
                                    onChange={e=> setComplete(e.target.value)}
                                    value={complete}
                                    variant="outlined"
                                    id="firsName"
                                    name="firsName"
                                    type="text"
                                    className="form-primary"
                                    onBlur={e => onBlur(e)}
                                />
                            
                            </Grid>
                        </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Seleccionar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                
                                    value={typeSender ? typeSender : "uno"}
                                    onChange={(e) => setTypeSender(e.target.value) }
                                    label="Seleccionar"
                                >{
                                    typeCuadra.length >= 1 ?
                                        typeCuadra.map(i => <MenuItem value={i.cod} key={i.cod}>{i.descripcion}</MenuItem>)
                                    
                                    : <MenuItem value="">Cargando...</MenuItem>
                                }
                                    <MenuItem value="uno" disabled>
                                        <em className="example">Ej: manzana, piso</em>
                                    </MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="firsName"
                                name="firsName"
                                onChange={(e) => setCompleteSender(e.target.value) }
                                value={completeSender}
                                type="text"
                                className="form-primary"
                                onBlur={e => onBlur(e)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Seleccionar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    value={typeHouse ? typeHouse : "uno"}
                                    onChange={(e) => setTypeHouse(e.target.value) }
                                    label="Seleccionar"
                                    onBlur={e => onBlur(e)}
                                >
                                    <MenuItem value="uno" disabled>
                                        <em className="example">Ej: Apartamento, casa</em>
                                    </MenuItem>
                                    { typeHouses.length >= 1 ? 
                                        typeHouses.map(i => <MenuItem value={i.cod} key={i.cod}>{i.descripcion}</MenuItem>)
                                    : <MenuItem value="">Cargando...</MenuItem>  }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="firsName"
                                name="firsName"
                                type="text"
                                className="form-primary"
                                onChange={(e) => setCompleteHouse(e.target.value) }
                                value={completeHouse}
                                onBlur={e => onBlur(e)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                <button
                    disabled={ calle != "" &&  dirOne != "" && num != "" && complete != "" ? false : true}
                    type="submit"
                    className="btn btn-primary w-100 mb-4 " id="bnNext"
                    onClick={hableSave}
                >
                    Siguiente
                </button>
                </Grid>
            </Grid>
        </ Container>
    )
};

export default StepTwo;
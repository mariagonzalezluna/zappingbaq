import React, {useState} from 'react';
import {Grid, TextField, Container} from '@material-ui/core';
import boot from '../../assets/img/BOOT-QUESTIOS.svg';
import Endpoint from "../../Api/endpoints";

function StepOne (props){
    
    const [name, setName] = useState("");
    const [secundName, setSecundName] = useState("");
    const [apellido, setApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");

    function onBlur(e){
        let obj = {
            first_name: name,
            middle_name: secundName,
            first_last_name: apellido,
            second_last_name: segundoApellido
        }
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/form21`, {method: 'PUT', body: JSON.stringify(obj)});
    }

    const hableSave = () => {
        let obj = {
            first_name: name,
            middle_name: secundName,
            first_last_name: apellido,
            second_last_name: segundoApellido
        }
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${localStorage.getItem("clientId")}/form21/complete`, {method: 'PUT'});
        props.save(obj)
        props.next();
    }
    return(
        <Container maxWidth="sm" className="containerQuestion">
            <div className="imgBott">
                <img src={boot}/>
            </div>
            <h1 className="title">Quiero saber más sobre ti, ¿cómo es tu nombre?</h1>
             <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Primer Nombre"
                        placeholder="Primer Nombre"
                        variant="outlined"
                        id="firsName"
                        name="firsName"
                        type="text"
                        className="form-primary"
                        onChange={(e) => setName(e.target.value) }
                        value={name}
                        onBlur={e => onBlur(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Segundo Nombre"
                        placeholder="Segundo Nombre"
                        variant="outlined"
                        id="secundName"
                        name="secundName"
                        type="text"
                        className="form-primary"
                        onChange={(e) => setSecundName(e.target.value) }
                        value={secundName}
                        onBlur={e => onBlur(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Primer Apellido"
                        placeholder="Primer Apellido"
                        variant="outlined"
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="form-primary"
                        onChange={(e) => setApellido(e.target.value) }
                        value={apellido}
                        onBlur={e => onBlur(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Segundo Apellido"
                        placeholder="Segundo Apellido"
                        variant="outlined"
                        id="secundlastName"
                        name="secundlastName"
                        type="text"
                        className="form-primary"
                        onChange={(e) => setSegundoApellido(e.target.value) }
                        value={segundoApellido}
                        onBlur={e => onBlur(e)}
                    />
                </Grid>
                <Grid item xs={12} >
                <button
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

export default StepOne;
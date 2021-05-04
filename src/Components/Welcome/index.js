import React, { useState, useEffect } from 'react';
import {Grid, TextField, Container, Dialog, DialogTitle, LinearProgress} from '@material-ui/core';
import { useFormik } from 'formik';
import Loading from './loading';
import avatar from '../../assets/img/asesorVirtual.svg';
import { connect } from 'react-redux';
import { userDataAction } from '../../Redux/actions/dataUserAction';
import { visorAction } from '../../Redux/actions/visorAction';
import { useHistory} from 'react-router-dom';
import {modoCRequest} from '../../Api/modoC';
import Endpoint from '../../Api/endpoints';

const validate = values => {
  const errors = {};
  if (!values.cedula) {
    errors.cedula = 'Este Campo es requerido';
  } else if (values.cedula.length <= 7) {
    errors.cedula = 'Cantidad de caracteres invalidos';
  }

  if (!values.phone) {
    errors.phone = 'Este Campo es requerido';
  } else if (values.phone.length <= 6) {
    errors.phone = 'Caracteres invalidos';
  }

  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ) {
    errors.email = 'Este Campo es requerido';
  }

  return errors;
};

let clientId;

function onBlur(e, field){
    if(clientId){
        fetch(`${Endpoint.tarjetizacionColApi}/JA/client/${clientId}?field=${field}&value=${e.currentTarget.value}`, {method: 'PUT'});
    } else {

        let params = new URLSearchParams(window.location.search);

        let origin;

        if(params.has('fbclid') || (params.has('utm_source') && params.get('utm_source').toLowerCase() == 'facebook')) {
            origin = 'facebook';
        } else if(params.has('gclid') || (params.has('utm_source') && params.get('utm_source').toLowerCase() == 'google')) {
            origin = 'google';
        } else if(params.has('twclid') || (params.has('utm_source') && params.get('utm_source').toLowerCase() == 'twitter')) {
            origin = 'twitter';
        } else if(params.has('li_fat_id') || (params.has('utm_source') && params.get('utm_source').toLowerCase() == 'linkedin')) {
            origin = 'linkedin';
        } else if(params.has('dclid')) {
            origin = 'doubleclick';
        } else if(params.has('msclkid')) {
            origin = 'bing';
        } else {
            origin = 'ND';
        }

        fetch(`${Endpoint.tarjetizacionColApi}/JA/client?field=${field}&value=${e.currentTarget.value}&origin=${origin}&source=${window.location.hostname}`, {method: 'POST'})
        .then(response => response.json())
        .then(data => clientId = data.internal_id);
    }
}

function Welcome(props){
    const [loading, serLoading] = useState(false);
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            cedula: '',
            phone: '',
            email: '',
        },
        validate,
        onSubmit: values => {
          serLoading(true);
          
          let objs ={
            "document_type":"CC",
            "country":"01",
            "segment":"SIN SEGMENTO",
            "cedula": values.cedula.toString(),
            "cellphone": values.phone.toString(),
            "email": values.email.toString()
          };

          modoCRequest(values.cedula, clientId).then(data => {

            if(data.status === 200){
              objs.internal_id = data.data.internal_id 
              props.userDataAction(objs)
              history.push("/terminos")

            } else if(data.status === 201){
                props.userDataAction(objs)
              
              if(data.data.segmento == "ORO" || data.data.segmento == "PORO" || data.data.segmento == "EJEMPLAR" || data.data.segmento == "PEJEMPLAR" || data.data.segmento == "RENTABLE" || data.data.segmento == "PRENTABLE" || data.data.segmento == "OTROS CREDITO" || data.data.segmento == "POTROS CREDITO" || data.data.segmento == "CLIENTE NUEVO"){
                props.visorAction(data.data);
                history.push("/gratulations");
              
              }else{
                console.log(data.data)
               /*  props.userDataAction(objs)
                history.push("/terminos") */
              }  
            }else if (data.status === 202){
              props.visorAction(data.data);
              history.push("/viables");
            }
          }).catch(e => {
            console.log(e)
          })
         
        },
    });
    return(
        <Container >
           <Grid container>
            <Grid item xs={12}>
              <div className="pt-2 text-center">
                  <img src={avatar} alt="house" width="60%" className="py-4"/>
                  <p class="title">Tengo un crédito especial para ti, ingresa y descúbrelo</p>
              </div>
            </Grid>
              <Grid item xs={12}  >
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        error={formik.errors.cedula ? true : false}
                        helperText={formik.errors.email}
                        fullWidth
                        label="cedula"
                        variant="outlined"
                        id="cedula"
                        name="cedula"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.cedula}
                        onBlur={e => onBlur(e, 'identification')}
                        className="form-primary"
                    />
                    <TextField
                        error={formik.errors.email ? true : false}
                        helperText={formik.errors.email}
                        fullWidth
                        label="Correo Electronico"
                        variant="outlined"
                        id="email"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={e => onBlur(e, 'email')}
                        className="form-primary"
                    />
                    <TextField
                        error={formik.errors.phone ? true : false}
                        helperText={formik.errors.phone}
                        fullWidth
                        label="Celular"
                        variant="outlined"
                        id="phone"
                        name="phone"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={e => onBlur(e, 'cellphone')}
                        className="form-primary"
                    />
                      <button
                          type="submit"
                          className="btn btn-primary w-100 mb-4 " id="bnNext"
                      >
                          ¡DESCUBRIR CRÉDITO!
                      </button>
                </form>
              </Grid>
           </Grid>

                <Dialog open={loading}>
                    <LinearProgress color="secondary" />
                    <DialogTitle >Procesando...</DialogTitle>
                </Dialog>
        </Container>
    )
};

const mapStateToProps = state => state;
const mapDispachToProps = {
  userDataAction,
  visorAction
}
export default connect(mapStateToProps, mapDispachToProps)(Welcome);
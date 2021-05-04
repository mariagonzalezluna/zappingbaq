import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { userDataAction } from '../../Redux/actions/dataUserAction';

import {Stepper, Step, StepLabel,  Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Tus datos', 'Donde vives', ''];
};


function Form(props){
    let history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    
  
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    function getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return <StepOne 
                next={ handleNext}
                save={props.userDataAction}
            />;
          case 1:
            return <StepTwo 
                next={ handleNext}
                back={handleBack}
                save={props.userDataAction}
            />;
          case 2:
            return <StepThree 
                next={ handleNext}
                back={handleBack}
                save={props.userDataAction}
                data={props.daraUser}
            />;
          default:
            return <StepOne 
                next={ handleNext}
                back={handleBack}
                save={props.userDataAction}
                data={props.daraUser}
            />;
        }
    }

    useEffect( () => {
        if(Object.keys(props.daraUser).length === 0) {
            history.push("/welcome")
        }
    },[]);

    console.log(props.daraUser)
    
    return(
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel className={classes.root}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
                ) : (
                <div>
                    {getStepContent(activeStep)}
                </div>
                )}
            </div>
        </div>
    )
};
const mapStateToProps = (store) => store ;
const mapDispachToProps = {
    userDataAction
};

export default connect(mapStateToProps, mapDispachToProps) (Form);
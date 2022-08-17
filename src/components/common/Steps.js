import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import SignUpContext from '../../contexts/SignUpContext';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepOne from '../Steps/StepOne';
import { Box } from '@mui/material';
import StepTwo from '../Steps/StepTwo';
import Stepthree from '../Steps/Stepthree';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 30px)',
      right: 'calc(50% + 30px)',
      height: 7,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "white",
        opacity: 0.7,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "white"
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FFFFFF26",
      borderTopWidth: 3,
      borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: '#FFFFFF26',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    fontSize: 60,
    ...(ownerState.active && {
    color: "#FFFFFF26",
    }),
    '& .QontoStepIcon-completedIcon': {
        color: "white",
        // zIndex: 1,
        fontSize: 60,
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: `1px solid white`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    '& .QontoStepIcon-circle': {
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        border: ownerState.active ?  `1px solid white`: `1px solid #FFFFFF26`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
    },
}));

function QontoStepIcon(props) {
  const { active, completed, className, icon } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
       {completed ? (
          <div className="QontoStepIcon-completedIcon">
            <Check />
          </div>
        ) : (
            <div className="QontoStepIcon-circle">
                <Typography sx={{color: active ? "white" : "white", opacity: active ? 1 : 0.8}}>{icon}</Typography>
            </div>
        )}
    </QontoStepIconRoot>
  );
}
const steps = ['', '', ''];

export default function CustomizedSteppers() {
    const { activeStep, setActiveStep } = useContext(SignUpContext);

    const componentStep = (index) => {
        switch (index) {
            case 0:
                return <StepOne/>;
            case 1: 
                return <StepTwo/>;  
            case 2: 
                return <Stepthree/>;      
            default:
                break;
        }
    }   
    return (
        <Box>
            <Stack sx={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center"}} spacing={4}>
                <Box sx={{width: {xs: "100%", md: "65%"}, mb: 4}}>                
                    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                            </Step>
                        ))}
                    </Stepper> 
                </Box>
            </Stack>
            <Typography sx={{ mt: 2, mb: 1 }}>{componentStep(activeStep)}</Typography>
        </Box>
    );
}
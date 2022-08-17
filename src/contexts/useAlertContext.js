import React, { createContext, useContext, useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { ThemeContext } from './useThemeContext'

const STATE_INITIAL = {}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertContext = createContext(STATE_INITIAL)

export default function AlertProvider(props) {
  const [status, setStatus] = useState("");
  const [stateAlert, setStateAlert] = useState({
    open: false,
    title: '',
    message: '',
    btnSuccess: '',
    btnClose: '',
    status: "",
    onSuccess: () => {},
    onClose: () => {},
  })

  const { theme } = useContext(ThemeContext)

  const { children } = props
  const onCloseAlertDialog = () => {
    setStateAlert({
      open: false,
      title: '',
      message: '',
      btnClose: '',
      btnSuccess: '',
      status: "",
      onSuccess: () => {},
      onClose: () => {},
    })
  }

  const onOpenAlertDialog = (alertDetails) => {
    switch (alertDetails.status) {
      case "success":
        setStatus(theme.colorPrimary);
        break;
      case "warning":
        setStatus(theme.colorWarning);
        break;
      case "info":
        setStatus(theme.colorBlue);
        break;
      case "error":
        setStatus(theme.colorError);
        break;
    
      default:
        break;
    }
    setStateAlert(alertDetails)
  }

  return (
    <AlertContext.Provider
      value={{
        onOpenAlertDialog,
        onCloseAlertDialog,
      }}
    >
      {children}
      
      <Dialog
        open={stateAlert.open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{color: status}}>{stateAlert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {stateAlert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            sx={{
              color: "gray"
            }}
            onClick={stateAlert.onClose}
          >
            {stateAlert.btnClose}
          </Button>
          <Button 
            onClick={stateAlert.onSuccess}
            sx={{
              color: status
            }}
          >
            {stateAlert.btnSuccess}
          </Button>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  )
}

export { AlertProvider, AlertContext }

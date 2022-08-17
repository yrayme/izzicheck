import React, { createContext, useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';

import { ThemeContext } from './useThemeContext'

const STATE_INITIAL = {}

function Transition(props) {
  return <Slide {...props} direction="right" />;
}

const AlertSimpleContext = createContext(STATE_INITIAL)

export default function AlertSimpleProvider(props) {
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    status: 'success'
  })

  const { theme } = useContext(ThemeContext)

  const { children } = props
  const onCloseAlert = () => {
    setAlert({
      open: false,
      message: '',
      status: 'success',
    })
  }

  const onOpenAlert = (alertDetails) => {
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
    setAlert(alertDetails)
  }

  return (
    <AlertSimpleContext.Provider
      value={{
        onOpenAlert,
        onCloseAlert,
      }}
    >
      {children}
      <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={onCloseAlert}
          anchorOrigin={{
              vertical: "top",
              horizontal: "right",
          }}
          TransitionComponent={Transition}
          action={
              <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onCloseAlert}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
          }
          >
          <Alert
              onClose={onCloseAlert}
              variant="filled"
              severity={alert.status}
              sx={{
                backgroundColor: status
              }}
          >
              {alert.message}
          </Alert>
      </Snackbar>
    </AlertSimpleContext.Provider>
  )
}

export { AlertSimpleProvider, AlertSimpleContext }

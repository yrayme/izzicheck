import React, { useContext, useState,  useEffect } from 'react';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import configApp from '../../../config/config';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/useAuthContext';
import CustomTextField from '../common/CustomTextField';

export default function DialogCode({
    handleVisibilityDialog,
    openDialog,
    data,
    setSearch,
    setData,
    setChange,
}) {
    const { theme } = useContext(ThemeContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const { auth, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        id: "",
        amount: "",
    },)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            amount: Yup.string().required('Requerido')
            .matches(/[0-9.,]/, "Este campo acepta solo números"),
        }),
        validate: (values) => {
            const errors = {}
            return errors
        },
        onSubmit: async (values) => {
            const { amount } = values;
            setLoading(true);
            let body = {
                "amount": amount,
            };

            if (data){
                body.id = id;
            }
            axios({
                method: data ? "put" : "post",
                url: `${configApp.baseUrl}/payments`,
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
                data: body
            }).then(function (response) {
                setLoading(false);
                setSearch(" ");
                setChange(response);
                onOpenAlert({
                  open: true,
                  message: response.data.message,
                  status: 'success'
                })
                formik.handleReset();
                handleClose();
            })
            .catch(function (error) {
                if(error.response.status === 401){
                    return logout(router.replace('/'));
                }
                onOpenAlert({
                  open: true,
                  message: error.response?.data?.message,
                  status: 'error'
                })
              setLoading(false);
            })
        }
    });

    
    useEffect(() => {
        if ( data ){
            formik.setValues({...initialValues, 
                id: data.id,
                amount: data.name,
            });
        }
    }, [data]);


    const handleClose = () => {
        setData(false);
        handleVisibilityDialog("hide", "payment");
        formik.handleReset();
    }

    return (
        <Dialog 
            open={Boolean(openDialog)} 
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: 20,
                    overflow: "hidden"
                },
            }}
        >
            <DialogTitle sx={{color:theme.colorWhite, background: theme.colorSecundary}}>
                <Grid container spacing={2}>
                    <Grid item xs={10.5} md={10.5}>
                        <span>Generación de código</span> 
                    </Grid>
                    <Grid item xs={1.5} md={1.5}>
                        <Button onClick={handleClose} sx={{color:theme.colorWhite, pr:4}}>X</Button>
                    </Grid>    
                </Grid>
            </DialogTitle>
            <DialogContent sx={{mt:2}}>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={12} sm={12}>
                        <CustomTextField
                            label="Monto"
                            name="amount"
                            id="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.errors.amount} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    onClick={handleClose}
                    variant='outlined'
                    sx={{
                        textTransform: "none",
                        color:theme.colorLabel,
                        borderColor: theme.grayInput
                    }}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={formik.handleSubmit}
                    color="secondary"
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        color: theme.colorWhite,
                    }}
                    disabled={loading}
                >
                    Generar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

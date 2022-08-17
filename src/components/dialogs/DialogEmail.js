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

export default function DialogEmail({
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
        email: "",
        password: ""
    },)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().required('Requerido').email("El email es incorrecto"),
            // password: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            if(!data){                
                if (!values.password){
                    errors.password = "Requerido";
                }
            }else{
                errors = {};
            }
            return errors
        },
        onSubmit: async (values) => {
            const { email, password, id } = values;
            setLoading(true);
            let body = {
                "address": email,
            };
            if (data){
                body.id = id;
            }else{
                body.password = password;
            }
            axios({
                method: data ? "put" : "post",
                url: `${configApp.baseUrl}/directories`,
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
                email: data.address,
            });
        }
    }, [data]);


    const handleClose = () => {
        setData(false);
        handleVisibilityDialog("hide", "email");
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
                        <span>{data ? "Actualizar" : "Crear"} correo</span> 
                    </Grid>
                    <Grid item xs={1.5} md={1.5}>
                        <Button onClick={handleClose} sx={{color:theme.colorWhite, pr:4}}>X</Button>
                    </Grid>    
                </Grid>
            </DialogTitle>
            <DialogContent sx={{mt:2}}>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={6} sm={12}>
                        <CustomTextField
                            label="Correo electrónico"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.errors.email} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                        <CustomTextField
                            label="Contraseña"
                            name="password"
                            id="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.errors.password} 
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
                    {data ? "Actualizar" : "Crear"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

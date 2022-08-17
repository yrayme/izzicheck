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
import CustomSelect from '../common/CustomSelect';

export default function DialogBoxes({
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
    const [sucursal, setSucursal] = useState([]);
    const [cajero, setCajero] = useState([]);
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        description: "",
        sucursal: "", 
        cajero: "",
    },)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            description: Yup.string().required('Requerido'),
            sucursal: Yup.string().required('Requerido'),
            cajero: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            return errors
        },
        onSubmit: async (values) => {
            const {name, description, sucursal, cajero } = values;
            setLoading(true);
            let body = {
                "name": name,
                "description": description,
                "branchOfficeId": sucursal,
                "cashierId": cajero
            };

            if (data){
                body.id = id;
            }
            axios({
                method: data ? "put" : "post",
                url: `${configApp.baseUrl}/cash_registers`,
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
                  message: error.response.data.message,
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
                name: data.name,
                description: data.description,
                sucursal: data.branchOffice?.id,
                cajero: data.cashier?.id,
            });
        }
    }, [data]);

    useEffect(() => {
        if (openDialog){
            const getSucursal =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/branch_offices?limit=${-1}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                setSucursal(data.data.rows);
            }
            const getCajero =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/operators?limit=${-1}&roleId=${1}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                setCajero(data.data.rows);
            }
            getCajero();
            getSucursal();
        }
    }, [openDialog, auth]);

    const handleClose = () => {
        setData(false);
        handleVisibilityDialog("hide", "boxes");
        formik.handleReset();
    }

    return (
        <Dialog 
            open={Boolean(openDialog)} 
            maxWidth="sm"
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
                        <span>{data ? "Actualización" : "Creación"} de cajas</span> 
                    </Grid>
                    <Grid item xs={1.5} md={1.5}>
                        <Button onClick={handleClose} sx={{color:theme.colorWhite, pr:4}}>X</Button>
                    </Grid>    
                </Grid>
            </DialogTitle>
            <DialogContent sx={{mt:2}}>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={6} sm={6}>
                        <CustomTextField
                            label="Nombre"
                            name="name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.errors.name} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <CustomTextField
                            label="Descripción"
                            name="description"
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.errors.description} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomSelect
                            label="Sucursal"
                            name="sucursal"
                            id="sucursal"
                            value={formik.values.sucursal}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sucursal && Boolean(formik.errors.sucursal)}
                            helperText={formik.errors.sucursal} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        >
                        {sucursal.length > 0 && sucursal.map((c, index) => {
                            return(
                                <MenuItem value={c.id} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomSelect
                            label="Cajero"
                            name="cajero"
                            id="cajero"
                            value={formik.values.cajero}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cajero && Boolean(formik.errors.cajero)}
                            helperText={formik.errors.cajero} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        >
                        {cajero.length > 0 && cajero.map((c, index) => {
                            return(
                                <MenuItem value={c.id} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
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

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
import { countries } from '../../constants';
import Image from 'next/image';

export default function DialogBranches({
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
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [typeBusiness, settypeBusiness] = useState([]);
    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "", 
        description: "",
        state: "",
        city: "", 
        address: "",
        type: "",
        supervisor: "",
        otherType: ""
    },)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 \b]/, "Este campo es tipo texto"),
            description: Yup.string().required('Requerido'),
            state: Yup.string().required('Requerido'),
            city: Yup.string().required('Requerido'),
            address: Yup.string().required('Requerido'),
            type: Yup.string().required('Requerido'),
            supervisor: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            if(values.type === 5){
                if (!values.otherType){                    
                    errors.otherType = "Requerido";
                }
            }else{
                errors = {};
            }
            return errors
        },
        onSubmit: async (values) => {
            const { id, otherType, type, supervisor, name, state, city, address, description} = values;
            setLoading(true);
            let body = {
                "name": name,
                "description": description,
                "address": address,
                "city": city,
                "state": state,
                "supervisorId": supervisor,
                "typeId": type,
                "otherTypeSpecificName": otherType
            };

            if (data){
                body.id = id;
            }
            axios({
                method: data ? "put" : "post",
                url: `${configApp.baseUrl}/branch_offices`,
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
        if (openDialog){
            axios({
                method: "get",
                url: `https://countriesnow.space/api/v0.1/countries/states`,
            }).then(function (response) {
                setState(response.data.data)
            })
            .catch(function (error) {
            })
            const getSupervisor =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/operators?limit=${-1}&roleId=${2}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                setSupervisor(data.data.rows);
            }
            const getTypeBusiness =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/branch_office_types?limit=${-1}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                settypeBusiness(data.data.rows);
            }
            getTypeBusiness();
            getSupervisor();
        }
    }, [openDialog]);

    useEffect(() => {
        if (formik.values.state){
            axios({
                method: "post",
                url: `https://countriesnow.space/api/v0.1/countries/states`,
                data:{
                    "country": formik.values.state
                }
            }).then(function (response) {
                setCity(response.data.data.states)
            })
            .catch(function (error) {
            })
        }
    }, [formik.values.state]);
    
    useEffect(() => {
        if (data){
            formik.setValues({...initialValues, 
                id:data.id,
                name: data.name,
                state: data.state,
                city: data.city,
                address: data.address,
                type: data.type?.name,
                supervisor: data.supervisor?.name,
            });
        }
    }, [data]);

    const handleCreate = () => {
        handleVisibilityDialog("hide", "branches")
    }

    const handleClose = () =>{
        setData(false);
        handleVisibilityDialog("hide", "branches");
        formik.handleReset();
    }

    return (
        <Dialog 
            open={openDialog} 
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
                        <span>{data ? "Actualización" : "Creación"} de Sucursales</span> 
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
                    <Grid item xs={12} md={6} sm={6}>
                        <CustomSelect
                            label="Estado"
                            name="state"
                            id="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.errors.state} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}             
                        >
                        {state.length > 0 && state.map((c, index) => {
                            return(
                                <MenuItem value={c.name} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <CustomSelect
                            label="Ciudad"
                            name="city"
                            id="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.errors.city} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        >
                        {city.length > 0 && city.map((c, index) => {
                            return(
                                <MenuItem value={c.name} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomTextField
                            label="Dirección"
                            name="address"
                            id="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.errors.address} 
                            color={theme.colorItemMenu}    
                            colorText={theme.colorItemMenu}                      
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={0.5}>
                        <CustomSelect
                            label="Tipo de negocio"
                            name="type"
                            id="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.errors.type} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        >
                        {typeBusiness.length > 0 && typeBusiness.map((c, index) => {
                            return(
                                <MenuItem value={c.id} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
                    </Grid>
                    {formik.values.type === 5 && (
                        <Grid item xs={12} md={6} sm={6} mt={1}>
                            <CustomTextField
                                label="Otro"
                                name="otherType"
                                id="otherType"
                                value={formik.values.otherType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.otherType && Boolean(formik.errors.otherType)}
                                helperText={formik.errors.otherType} 
                                color={theme.colorItemMenu}    
                                colorText={theme.colorItemMenu}                      
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomSelect
                            label="Agregar supervisor"
                            name="supervisor"
                            id="supervisor"
                            value={formik.values.supervisor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.supervisor && Boolean(formik.errors.supervisor)}
                            helperText={formik.errors.supervisor} 
                            color={theme.colorItemMenu} 
                            colorText={theme.colorItemMenu}                        
                        >
                        {supervisor.length > 0 && supervisor.map((c, index) => {
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

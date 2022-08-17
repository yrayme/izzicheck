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

export default function DialogUsers({
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
    const [roles, setRoles] = useState([]);
    const [docIdent, setDocIdent] = useState([]);
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        id: "",
        firstname: "", 
        secundname: "",
        lastname: "", 
        secundlastname: "",
        email: "",
        user: "",
        password: "",
        code: "",
        phone: "",
        docIdent: "",
        numIdent: "",
        perfil: "",
    },)

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            firstname: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 \b]/, "Este campo es tipo texto"),
            secundname: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 \b]/, "Este campo es tipo texto"),
            lastname: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 \b]/, "Este campo es tipo texto"),
            secundlastname: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 \b]/, "Este campo es tipo texto"),
            email: Yup.string().required('Requerido').email("Correo incorrecto"),
            user: Yup.string().required('Requerido'),
            code: Yup.string().required('Requerido'),
            phone: Yup.number().required('Requerido'),
            docIdent: Yup.string().required('Requerido'),
            numIdent: Yup.string().required('Requerido')
            .matches(/[0-9a-zA-Z\b]/, "Este campo es tipo texto"),
            perfil: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            if(!data){                
                if (!values.password){
                    errors.password = "Requerido";
                }
            }
            return errors
        },
        onSubmit: async (values) => {
            const { id, user, email, password, firstname, secundname, lastname, secundlastname, code, phone, docIdent, numIdent, perfil } = values;
            setLoading(true);
            let body = {
                "name": firstname,
                "surname": lastname,
                "secondName": secundname,
                "secondSurname": secundlastname,
                "user": user,
                "email": email,
                "password": password,
                "confirmPassword": password,
                "phoneNumber": phone,
                "phoneCountryCode": code,
                "identityDocumentNumber": numIdent,
                "identityDocumentTypeId": docIdent,
                "roleId": perfil
            };

            if (data){
                body.id = id;
            }
            axios({
                method: data ? "put" : "post",
                url: `${configApp.baseUrl}/operators`,
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
                firstname: data.name,
                secundname: data.secondName,
                lastname: data.lastname,
                secundlastname: data.secondSurname,
                user: data.userName,
                email: data.email,
                password: data.city,
                code: data.phoneCountryCode,
                phone: data.phoneNumber,
                docIdent: parseInt(data.identityDocument?.identityDocumentType?.id),
                numIdent: data.identityDocument?.number,
                perfil: parseInt(data.role?.id),
            });
        }
    }, [data]);

    useEffect(() => {
        if (openDialog){
            const getRoles =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/roles?limit=${-1}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                setRoles(data.data.rows);
            }
            const getDocIdent =  async () => {
                const { data } = await axios({
                    method: "get",
                    url: `${configApp.baseUrl}/identity_document_types?limit=${-1}`, 
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                })
                setDocIdent(data.data.rows);
            }
            getRoles();
            getDocIdent();
        }
    }, [openDialog, auth]);

    const handleClose = () => {
        setData(false);
        handleVisibilityDialog("hide", "users");
        formik.handleReset();
    }
    return (
        <Dialog 
            open={openDialog || false} 
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
                        <span>{data ? "Actualización" : "Creación"} de usuarios</span> 
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
                            label="Primer nombre"
                            name="firstname"
                            id="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.errors.firstname}
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                    
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <CustomTextField
                            label="Segundo nombre"
                            name="secundname"
                            id="secundname"
                            value={formik.values.secundname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.secundname && Boolean(formik.errors.secundname)}
                            helperText={formik.errors.secundname} 
                            color={theme.colorItemMenu}  
                            colorText={theme.colorItemMenu}                        
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomTextField
                            label="Primer apellido"
                            name="lastname"
                            id="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.errors.lastname} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomTextField
                            label="Segundo apellido"
                            name="secundlastname"
                            id="secundlastname"
                            value={formik.values.secundlastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.secundlastname && Boolean(formik.errors.secundlastname)}
                            helperText={formik.errors.secundlastname} 
                            color={theme.colorItemMenu}    
                            colorText={theme.colorItemMenu}                      
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomTextField
                            label="Nombre de usuario"
                            name="user"
                            id="user"
                            value={formik.values.user}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.user && Boolean(formik.errors.user)}
                            helperText={formik.errors.user} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
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
                    <Grid item xs={12} md={6} sm={6} mt={1}>
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
                    <Grid item xs={12} md={2} sm={6} mt={0.5}>
                        <CustomSelect
                            label="Código"              
                            id="code"     
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.errors.code}
                            color={theme.colorItemMenu} 
                            colorText={theme.colorItemMenu} 
                        >
                            {countries.map((c, index) => {
                                return(
                                    <MenuItem value={`+${c.phone}`} key={index}>
                                    <Typography sx={{marginRight: 1,}}>+{c.phone}</Typography>
                                        <Image
                                            width="15"
                                            height="15"
                                            src={`/assets/flags/${c.code.toLowerCase()}.svg`}
                                            alt={`Flag of ${c.label}`}
                                            style={{marginTop: 0, borderRadius: "100%"}}
                                        />
                                    </MenuItem>
                                )
                            })} 
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} mt={1}>
                        <CustomTextField 
                            label="Teléfono"         
                            id="phone"     
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.errors.phone}
                            color={theme.colorItemMenu} 
                            colorText={theme.colorItemMenu} 
                        />
                    </Grid>
                    <Grid item xs={12} md={2} sm={6} mt={1}>
                        <CustomSelect 
                            label="Documento de identidad"         
                            id="docIdent"     
                            name="docIdent"
                            value={formik.values.docIdent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.docIdent && Boolean(formik.errors.docIdent)}
                            helperText={formik.errors.docIdent}
                            color={theme.colorItemMenu} 
                            colorText={theme.colorItemMenu} 
                        >
                        {docIdent.length > 0 && docIdent.map((c, index) => {
                            return(
                                <MenuItem value={c.id} key={index}>
                                    {c.name}
                                </MenuItem>
                            )
                        })} 
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6} mt={1.7}>
                        <CustomTextField
                            label="Número de documento"
                            name="numIdent"
                            id="numIdent"
                            value={formik.values.numIdent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.numIdent && Boolean(formik.errors.numIdent)}
                            helperText={formik.errors.numIdent} 
                            color={theme.colorItemMenu}   
                            colorText={theme.colorItemMenu}                       
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} mt={1}>
                        <CustomSelect 
                            label="Perfil"         
                            id="perfil"     
                            name="perfil"
                            value={formik.values.perfil}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.perfil && Boolean(formik.errors.perfil)}
                            helperText={formik.errors.perfil}
                            color={theme.colorItemMenu} 
                            colorText={theme.colorItemMenu} 
                        >
                        {roles.length > 0 && roles.map((c, index) => {
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

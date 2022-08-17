import React, { useContext, useState, useEffect } from 'react';
import WithAuth from '../../components/hoc/WithAuth';
import LayoutBackground from '../../components/layout/LayoutBackground';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Divider, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import CustomTextField from '../../components/common/CustomTextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/common/CustomButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CustomSwitch from '../../components/common/CustomSwitch';
import LayoutCard from '../../components/layout/layoutCard';
import configApp from '../../../config/config';
import axios from 'axios';
import { AuthContext } from '../../contexts/useAuthContext';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import { StateContext } from '../../contexts/useStateContext';


export default function Login() {
    const { theme } = useContext(ThemeContext);
    const { login } = useContext(AuthContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const { loginType } = useContext(StateContext);
    const [Openswitch, setOpenSwitch] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        email: "", 
        password: "",
    },)
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().required('Requerido').email("Correo incorrecto"),
            password: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            return errors
        },
        onSubmit: async (valores) => {
            const { email, password } = valores;
            if (Openswitch) {
                if (loginType){
                    localStorage.setItem("email_izzicheck_admin", email);
                }else{
                    localStorage.setItem("email_izzicheck", email);
                }
            }
            axios({
                method: "post",
                url: `${configApp.baseUrl}/auth/${loginType ? "login" : "operators/login"}`,
                // headers: {
                // "Authorization": `Bearer ${auth.token}`
                // },
                data: {
                    "user": email,
                    "password": password
                }
            }).then(function (response) {
                // setLoading(false);
                const { token, data } = response.data;
                onOpenAlert({
                  open: true,
                  message: response.data.message,
                  status: 'success'
                })
                sidebar(token, data);
            })
            .catch(function (error) {
                onOpenAlert({
                  open: true,
                  message: error.response.data.message,
                  status: 'error'
                })
              setLoading(false);
            })
        }
    });

    const sidebar = (token, responseData) => {        
        axios({
            method: "get",
            url: `${configApp.baseUrl}/profile/sidebar`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then(function (response) {
            setLoading(false);
            const { token, data } = response.data;
            localStorage.setItem("menu", JSON.stringify(data));
            login(token, responseData);

        })
        .catch(function (error) {
            onOpenAlert({
              open: true,
              message: error.response.data.message,
              status: 'error'
            })
            setLoading(false);
        })
    }

    useEffect(() => {
        let email = "";
        if (loginType){
            email = localStorage.getItem('email_izzicheck_admin');
        }else{
            email = localStorage.getItem('email_izzicheck');
        }
        formik.setValues({...initialValues, email});
    }, [])
    
    const handleSwitch = (event) => {
        setOpenSwitch(event.target.checked);
    }

    return (
        <WithAuth safe={false}>
            <LayoutBackground
                titleButton={"Registrarse"}
                icon={
                    <Image 
                      src="/assets/icons/Register.png"
                      alt="logo"
                      width={14}
                      height={14}
                    />
                }
                onClick={() => {router.push('/signUp')}}
            >
                <LayoutCard
                    width="65%"
                    marginTop={-100}
                >
                    <Typography variant='h4' sx={{color: theme.colorWhite, fontWeight: 600}}>Inicia sesión {loginType ? "Administrador" : "Empleado"}</Typography>
                    <form autoComplete='off'>
                        <Box mt={3}>
                            <CustomTextField                    
                                label="Correo"                           
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.errors.email}
                            />
                        </Box>
                        <Box mt={3}>
                            <CustomTextField                    
                                label="Contraseña"                           
                                id="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.errors.password}
                            />
                        </Box>   
                        <Box mt={3}>
                            <CustomSwitch                                    
                                title={"Recordarme"}
                                onChange={handleSwitch}
                                value={Openswitch}
                            />
                        </Box>
                        <Box mt={3}>
                            <CustomButton
                                title={"Iniciar sesión"}
                                color={theme.colorPrimary}
                                endIcon={<KeyboardArrowRightIcon fontSize='small'/>}
                                fullWidth
                                onClick={formik.handleSubmit}
                                disabled={loading}
                            />
                        </Box>     
                        <Box mt={6} sx={{px:6}}>
                            <Divider sx={{background: theme.colorWhite, opacity: 0.4}}/>
                        </Box>
                        <Box mt={4} sx={{display: "flex", justifyContent: "center"}}>                            
                            <Image 
                                src="/assets/icons/keys.png"
                                alt="logo"
                                width={18}
                                height={18}
                            />
                            <Typography 
                                variant='subtitle2' 
                                sx={{
                                    color: theme.colorWhite,
                                    cursor: "pointer",
                                    ml:1
                                }}
                                onClick={() => {router.push('/password-recovery')}}
                            >
                                Olvidé mi contraseña
                            </Typography>
                        </Box>
                        <Box mt={0}>
                            <Typography 
                                variant='subtitle2' 
                                sx={{
                                    color: theme.colorWhite, 
                                    textDecoration: "underline",
                                    cursor: "pointer"
                                }}
                            >
                                Olvidé mis datos 
                            </Typography>
                        </Box>
                    </form>
                </LayoutCard>
            </LayoutBackground>
        </WithAuth>
    )
}

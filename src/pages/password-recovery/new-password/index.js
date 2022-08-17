import React, { useContext, useState } from 'react';
import WithAuth from '../../../components/hoc/WithAuth';
import LayoutBackground from '../../../components/layout/LayoutBackground';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { ThemeContext } from '../../../contexts/useThemeContext';
import CustomTextField from '../../../components/common/CustomTextField';
import CustomButton from '../../../components/common/CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LayoutCard from '../../../components/layout/layoutCard';
import SignUpContext from '../../../contexts/SignUpContext';
import SuccessfulPassword from '../../../components/SuccessfulPassword';
import configApp from '../../../../config/config';
import axios from 'axios';
import { AlertSimpleContext } from '../../../contexts/useAlertSimpleContext';

export default function NewPassword() {
    const { theme } = useContext(ThemeContext);
    const { successfulPassword, setSuccessfulPassword} = useContext(SignUpContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [security, setSecurity] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            code: "",
            newPassword: "", 
            confirmNewPassword: "",
        },
        validationSchema: Yup.object({
            // code: Yup.string().required('Requerido'),
            // newPassword: Yup.string().required('Requerido'),
            // confirmNewPassword: Yup.string()
            //   .test(
            //     "passwords-match",
            //     "¡Las contraseñas no son iguales!",
            //     function (value) {
            //       return this.parent.newPassword === value;
            //     }
            //   )
            //   .required("La confirmación es requerida"),
        }),
        validate: (values) => {
            const errors = {}
            if(!values.newPassword){
                setSecurity(null);
            }else if (values.newPassword.length >= 8){
                setSecurity("Fuerte");
            }else if(values.newPassword.length >4 && values.newPassword.length < 8){
                setSecurity("Media");
            }else if(values.newPassword.length <= 4){
                setSecurity("Baja");
            }
            return errors
        },
        onSubmit: async (valores) => {
            const { code, newPassword, confirmNewPassword } = valores;
            const email = sessionStorage.getItem("email");
            axios({
                method: "post",
                url: `${configApp.baseUrl}/auth/recovery_password`,
                data: {
                    "token": code,
                    "user": email,
                    "password": newPassword,
                    "confirmPassword": confirmNewPassword
                  }
            }).then(function (response) {
                setLoading(false);
                onOpenAlert({
                  open: true,
                  message: response.data.message,
                  status: 'success'
                })
                setSuccessfulPassword(true);
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

    return (
        <WithAuth safe={false}>
            {!successfulPassword ? (
                <LayoutBackground            
                    titleButton="Iniciar sesión"
                    icon={
                        <Image 
                            src="/assets/icons/login.png"
                            alt="logo"
                            width={14}
                            height={14}
                        />}
                        link={true}
                >
                    <LayoutCard
                        width="65%"
                        marginTop={-100}
                    >
                        <Typography variant='h5' sx={{color: theme.colorWhite, fontWeight: 600}}>Recuperando </Typography>
                        <Typography variant='h5' sx={{color: theme.colorWhite, fontWeight: 600}}>contraseña</Typography>
                        <Grid container mt={3} spacing={2}>
                            <Grid item xs={12} md={12}>
                                <CustomTextField
                                    label="Código de verificación"                           
                                    id="code"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.code && Boolean(formik.errors.code)}
                                    helperText={formik.errors.code}                    
                                />
                            </Grid>
                            <Grid item xs={12} md={12} mt={1}>
                                <CustomTextField        
                                    label="Nueva contraseña"         
                                    id="newPassword"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.errors.newPassword}
                                    placeholder="8-12 caracteres"
                                    maxLength={12}
                                >
                                <Box sx={{position: "absolute", top:27, right: 15}}>
                                    <Typography variant='subtitle2' sx={{color: theme.colorWhite}}>{security}</Typography>
                                </Box>
                                </CustomTextField>
                            </Grid>
                            <Grid item xs={12} md={12} mt={1}>
                                <CustomTextField        
                                    label="Repetir nueva contraseña"         
                                    id="confirmNewPassword"
                                    value={formik.values.confirmNewPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                    helperText={formik.errors.confirmNewPassword}
                                    placeholder="8-12 caracteres"
                                    maxLength={12}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} mt={2}>
                                <CustomButton                    
                                    title={"Recuperar"}
                                    fullWidth
                                    color={theme.colorSecundary}
                                    endIcon={<KeyboardArrowRightIcon fontSize='small'/>}
                                    onClick={formik.handleSubmit}
                                    disabled={loading}
                                />
                            </Grid>
                        </Grid>
                    </LayoutCard>
                </LayoutBackground>
            )
            : (
                <SuccessfulPassword/>
            )}
        </WithAuth>
    )
}

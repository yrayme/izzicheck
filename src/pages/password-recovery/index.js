import React, { useContext, useState } from 'react';
import WithAuth from '../../components/hoc/WithAuth';
import LayoutBackground from '../../components/layout/LayoutBackground';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Typography, Grid } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import CustomTextField from '../../components/common/CustomTextField';
import CustomButton from '../../components/common/CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LayoutCard from '../../components/layout/layoutCard';
import configApp from '../../../config/config';
import axios from 'axios';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext'

export default function PasswordRecovery() {
    const { theme } = useContext(ThemeContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            email: "", 
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Requerido').email("Correo incorrecto"),
        }),
        validate: (values) => {
            const errors = {}
            return errors
        },
        onSubmit: async (valores) => {
            const { email } = valores;
            sessionStorage.setItem("email", email);
            axios({
                method: "post",
                url: `${configApp.baseUrl}/auth/recovery_password/token`,
                data: {
                    "user": email,
                }
            }).then(function (response) {
                setLoading(false);
                onOpenAlert({
                  open: true,
                  message: response.data.message,
                  status: 'success'
                })
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
            <LayoutBackground            
                titleButton="Iniciar sesión"
                icon={
                    <Image 
                        src="/assets/icons/login.png"
                        alt="logo"
                        width={14}
                        height={14}
                    />
                }
                link={true}
            >
                <LayoutCard
                    width="65%"
                    marginTop={-100}
                >
                    <Typography variant='h5' sx={{color: theme.colorWhite, fontWeight: 600}}>Recuperar contraseña</Typography>
                    <Typography variant='subtitle2' sx={{color: theme.colorWhite, fontWeight: 400, mt:2}}>
                        Escribe tu correo de usuario, te enviaremos un enlace para recuperar tu contraseña
                    </Typography>
                    <Grid container mt={3} spacing={2}>
                        <Grid item xs={12} md={12} mt={-1}>
                            <CustomTextField        
                                label="Correo"         
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} mt={2}>
                            <CustomButton                    
                                title={"Enviar"}
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
        </WithAuth>
    )
}

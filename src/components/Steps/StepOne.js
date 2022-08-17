import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../../contexts/useThemeContext';
import { Grid } from '@mui/material';
import CustomTextField from '../common/CustomTextField';
import CustomButton from '../common/CustomButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SignUpContext from '../../contexts/SignUpContext';
import LayoutCard from '../layout/layoutCard';

export default function StepOne() {
    const { theme } = useContext(ThemeContext);
    const { activeStep, setActiveStep, formSignUp, setFormSignUp } = useContext(SignUpContext);

    const formik = useFormik({
        initialValues: {
            firstName: "", 
            secondName: "",
            lastName: "",
            secondlastName: "",
            email: "",
            confirmEmail: "",
            username: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 ]/, "Este campo es tipo texto"),
            secondName: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 ]/, "Este campo es tipo texto"),
            lastName: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 ]/, "Este campo es tipo texto"),
            secondlastName: Yup.string().required('Requerido')
            .matches(/[a-zA-ZÀ-ÿ\u00f1\u00d1 ]/, "Este campo es tipo texto"),
            email: Yup.string().required('Requerido').email("Correo incorrecto"),
            confirmEmail: Yup.string()
                            .email("Correo incorrecto")
                            .required("Requerido")
                            .oneOf([Yup.ref("email"), null], "¡Los correos no son iguales!"),
            username: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            return errors
        },
        onSubmit: async (values) => {
            setFormSignUp({...formSignUp, step1: values});
            handleNext();
        }
    });

    const handleNext = () => {
        setActiveStep(1);
    }

    return (
        <LayoutCard
            width="100%"
        >
            <Typography variant='h4' sx={{color: theme.colorWhite, fontWeight: 600}}>Empecemos</Typography>
            <Grid container mt={3} spacing={2}>
                <Grid item xs={12} md={6} sm={6}>
                    <CustomTextField
                        label="Primer nombre"                           
                        id="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.errors.firstName}                    
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                    <CustomTextField
                        label="Segundo nombre"                           
                        id="secondName"
                        value={formik.values.secondName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.secondName && Boolean(formik.errors.secondName)}
                        helperText={formik.errors.secondName}                    
                    />
                </Grid>
                <Grid item xs={12} md={6} mt={1} sm={6}>
                    <CustomTextField
                        label="Primer apellido"                           
                        id="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.errors.lastName}                    
                    />
                </Grid>
                <Grid item xs={12} md={6} mt={1} sm={6}>
                    <CustomTextField
                        label="Segundo apellido"                           
                        id="secondlastName"
                        value={formik.values.secondlastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.secondlastName && Boolean(formik.errors.secondlastName)}
                        helperText={formik.errors.secondlastName}                    
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={1} sm={6}>
                    <CustomTextField
                        label="Nombre de usuario"                           
                        id="username"
                        // placeholder={"correo@ejemplo.com"}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.errors.username}                    
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={1} sm={6}>
                    <CustomTextField
                        label="Correo electrónico"                           
                        id="email"
                        placeholder={"correo@ejemplo.com"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.errors.email}                    
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={1} sm={6}>
                    <CustomTextField
                        label="Confirmación de correo electrónico"                           
                        id="confirmEmail"
                        placeholder={"correo@ejemplo.com"}
                        value={formik.values.confirmEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                        helperText={formik.errors.confirmEmail}
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={1}>
                    <CustomButton                    
                        title={"Registrarme"}
                        endIcon={<KeyboardArrowRightIcon fontSize='small'/>}
                        fullWidth
                        color={theme.colorSecundary}
                        onClick={formik.handleSubmit}
                    />
                </Grid>
            </Grid>
        </LayoutCard>
    )
}

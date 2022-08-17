import React, { useState, useContext } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../../contexts/useThemeContext';
import { Grid } from '@mui/material';
import CustomTextField from '../common/CustomTextField';
import CustomButton from '../common/CustomButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SignUpContext from '../../contexts/SignUpContext';
import CustomSelect from '../common/CustomSelect';
import { countries } from '../../constants';
import Image from 'next/image';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CustomCheckbox from '../common/CustomCheckbox';
import LayoutCard from '../layout/layoutCard';
import axios from 'axios';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import configApp from '../../../config/config';

export default function StepTwo() {
    const { theme } = useContext(ThemeContext);
    const { activeStep, setActiveStep, formSignUp, setFormSignUp } = useContext(SignUpContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [loading, setLoading] = useState(false);
  

    const formik = useFormik({
        initialValues: {
            password: "", 
            confirmPassword: "",
            codeCountry: "",
            // code: "",
            phone: "",
            boolTerms: false,
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Requerido'),
            confirmPassword: Yup.string()
              .test(
                "passwords-match",
                "¡Las contraseñas no son iguales!",
                function (value) {
                  return this.parent.password === value;
                }
              )
              .required("La confirmación es requerida"),
              codeCountry: Yup.string().required('Requerido'),
            //   code: Yup.string().required('Requerido'),
              phone: Yup.string().required('Requerido')
                    .matches(/[0-9]/, "Este campo acepta solo números"),
            //         .matches(/^(-)(\d{3})?\d{3}?\d{4}$/, "Formato 412-7991326"),
              boolTerms: Yup.string().required('Requerido'),
        }),
        validate: (values) => {
            const errors = {}
            if(!values.boolTerms){
                errors.boolTerms = "Requerido"
            }
            return errors
        },
        onSubmit: async (values) => {
            const { password, confirmPassword, codeCountry, phone } = values;
            setFormSignUp({...formSignUp, step2: values});
            setLoading(true);
            axios({
                method: "post",
                url: `${configApp.baseUrl}/auth/signup`,
                // headers: {
                // "Authorization": `Bearer ${auth.token}`
                // },
                data: {
                    name: formSignUp.step1?.firstName,
                    surname: formSignUp.step1?.lastName,
                    secondName: formSignUp.step1?.secondName,
                    secondSurname: formSignUp.step1?.secondlastName,
                    user: formSignUp.step1?.username,
                    email: formSignUp.step1?.email,
                    confirmEmail: formSignUp.step1?.confirmEmail,
                    password: password,
                    confirmPassword: confirmPassword,
                    phoneNumber: `${codeCountry}${phone}`,
                }
            }).then(function (response) {
                setLoading(false);
                onOpenAlert({
                  open: true,
                  message: response.data.message,
                  status: 'success'
                })
                handleNext();
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

    const handleNext = () => {
        setActiveStep(2);
    }
    return (
        <LayoutCard
            width="100%"
        >
            <Typography variant='h4' sx={{color: theme.colorWhite, fontWeight: 600}}>Casi terminamos</Typography>
            <Grid container mt={3} spacing={2}>
                <Grid item xs={12} md={12} sm={6} mt={1}>
                    <CustomTextField
                        label="Contraseña"                           
                        id="password"
                        placeholder={"8-12 Caracteres"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.errors.password}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={6} mt={1}>
                    <CustomTextField
                        label="Confirmar contraseña"                           
                        id="confirmPassword"
                        placeholder={"8-12 Caracteres"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.errors.confirmPassword}
                    />
                </Grid>
                <Grid item xs={12} md={4} mt={1} sm={6}>
                    <CustomSelect
                        label="Teléfono"              
                        id="codeCountry"     
                        name="codeCountry"
                        value={formik.values.codeCountry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.codeCountry && Boolean(formik.errors.codeCountry)}
                        helperText={formik.errors.codeCountry}
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
                {/* <Grid item xs={12} md={3} sm={6} mt={{xs:-2, md:1}}>
                    <CustomSelect          
                        id="code"     
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.errors.code}
                    />
                </Grid> */}
                <Grid item xs={12} md={5} sm={6} mt={1.5}>
                    <CustomTextField 
                        placeholder="0000000"         
                        id="phone"     
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.errors.phone}
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={0}>
                    <CustomCheckbox
                        label={<span>Acepto los <span style={{textDecoration: "underline"}}>términos y condiciones</span></span>}
                        id="boolTerms"
                        onChange={formik.handleChange}
                        checked={formik.values.boolTerms}
                        onBlur={formik.handleBlur}
                        error={formik.touched.boolTerms && Boolean(formik.errors.boolTerms)}
                        helperText={formik.errors.boolTerms}
                    />
                </Grid>
                <Grid item xs={12} md={12} mt={0}>
                    <CustomButton                    
                        title={"Continuar"}
                        endIcon={<KeyboardArrowRightIcon fontSize='small'/>}
                        fullWidth
                        color={theme.colorSecundary}
                        onClick={formik.handleSubmit}
                        disabled={loading}
                    />
                </Grid>
            </Grid>
        </LayoutCard>
    )
}

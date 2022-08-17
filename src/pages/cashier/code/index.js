import React, { useState, useEffect, useContext } from 'react'
import WithAuth from '../../../components/hoc/WithAuth';
import { Box, Grid, Button } from '@mui/material';
import CustomizedTables from '../../../components/common/Table';
import TableContext from '../../../contexts/TableContext';
import { AlertSimpleContext } from '../../../contexts/useAlertSimpleContext';
import { AuthContext } from '../../../contexts/useAuthContext';
import axios from 'axios';
import configApp from '../../../../config/config';
import { useRouter } from 'next/router';
import CustomTextField from '../../../components/common/CustomTextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../../../contexts/useThemeContext';


export default function GenerateCode() {
    const { setTableData } = useContext(TableContext);
    const { theme } = useContext(ThemeContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [ loading, setLoading] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(false);
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

            // if (data){
            //     body.id = id;
            // }
            axios({
                method: "post",
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
        if ( auth.auth ){
            getPayment();
        } 
    }, [search, auth, change]);

    const getPayment = () =>{
        setLoading(search !== "" ? false : true);
        axios({
            method: "get",
            url: `${configApp.baseUrl}/payments?limit=-1&search=${search}`,
            headers: {
                "Authorization": `Bearer ${auth.token}`
            },
        }).then(function (response) {
            const { data } = response.data;
            const { rows } = data;
            setLoading(false);
            let array = [];
            rows.length > 0 && rows.map(row => {
                array.push({
                    id:row.id,
                    code: row.reference,
                    status: row.description,
                    amount: row.amount,
                })
            })
            setTableData({
                title: "Generar código",
                name: "payment",
                type: 5, //Funcionalidad añadir codigo
                rows: array,
                add: false,
            })
        })
        .catch(function (error) {
            if(error.response.status === 401){
                return logout(router.replace('/'));
            }
            setLoading(false);
            onOpenAlert({
                open: true,
                message: error.response.data.message,
                status: 'error'
            })
        })
    }

    return (
        <WithAuth safe>
            <Box px={4} mt={4}>
                <CustomizedTables
                    search={search}
                    setSearch={setSearch}
                    loadingTable={loading}
                    change={change}
                    setChange={setChange}
                >
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3} sm={4}>
                        <CustomTextField
                            label="Monto"
                            name="amount"
                            id="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.errors.amount}                      
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sm={3} mt={2.5}>
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
                    </Grid>
                </Grid>
                </CustomizedTables>
            </Box>
        </WithAuth>
    )
}

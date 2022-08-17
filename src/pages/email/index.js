import React, { useState, useEffect, useContext } from 'react'
import WithAuth from '../../components/hoc/WithAuth';
import { Box } from '@mui/material';
import CustomizedTables from '../../components/common/Table';
import TableContext from '../../contexts/TableContext';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import { AuthContext } from '../../contexts/useAuthContext';
import axios from 'axios';
import configApp from '../../../config/config';
import { useRouter } from 'next/router';


export default function Email() {
    const { setTableData } = useContext(TableContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [ loading, setLoading] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(false);

    useEffect(() => {
        if ( auth.auth ){
            getEmail();
        } 
    }, [search, auth, change]);

    const getEmail = () =>{
        setLoading(search !== "" ? false : true);
        axios({
            method: "get",
            url: `${configApp.baseUrl}/directories?limit=-1&search=${search}`,
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
                    email: row.address,
                    edit: true,
                    delete: true,
                })
            })
            setTableData({
                title: "Registro de correo",
                name: "email",
                type: 6, //Funcionalidad añadir correo
                rows: array
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
                />
            </Box>
        </WithAuth>
    )
}

import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import WithAuth from '../../components/hoc/WithAuth';
import CustomizedTables from '../../components/common/Table';
import TableContext from '../../contexts/TableContext';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import { AuthContext } from '../../contexts/useAuthContext';
import axios from 'axios';
import configApp from '../../../config/config';
import { useRouter } from 'next/router';

export default function Users() {
    const { setTableData } = useContext(TableContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [ loading, setLoading] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(false);
    
    useEffect(() => {
        if ( auth.auth ){
            getUsers();
        } 
    }, [search, auth, change]);

    const getUsers = () =>{
        setLoading(search !== "" ? false : true);
        axios({
            method: "get",
            url: `${configApp.baseUrl}/operators?limit=-1&search=${search}`,
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
                    username: row.name,
                    lastname: row.lastname,
                    email: row.email,
                    docIdent: row.address,
                    perfil: row.role?.name,
                    phone: `${row.phoneCountryCode}${row.phoneNumber}`,
                    edit: true,
                    delete: true,
                })
            })
            setTableData({
                title: "Registro de usuarios",
                name: "users",
                type: 2, //Funcionalidad añadir sucursal
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

import React, { useContext, useEffect, useState } from 'react'
import WithAuth from '../../components/hoc/WithAuth';
import CustomizedTables from '../../components/common/Table';
import { Box } from '@mui/material';
import TableContext from '../../contexts/TableContext';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import { AuthContext } from '../../contexts/useAuthContext';
import axios from 'axios';
import configApp from '../../../config/config';
import { useRouter } from 'next/router';

export default function Boxes() {
    const { setTableData } = useContext(TableContext);
    const router = useRouter();
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [ loading, setLoading] = useState(false);
    const { auth, logout } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(false);

    useEffect(() => {
        if ( auth.auth ){
            getBoxes();
        } 
    }, [search, auth, change]);

    const getBoxes = () =>{
        setLoading(search !== "" ? false : true);
        axios({
            method: "get",
            url: `${configApp.baseUrl}/cash_registers?limit=-1&search=${search}`,
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
                    name: row.name,
                    description: row.description,
                    sucursal: row.supervisor?.name,
                    cajero: row.address,
                    edit: true,
                    delete: true,
                })
            })
            setTableData({
                title: "Registro de Cajas",
                name: "boxes",
                type: 3, //Funcionalidad añadir caja
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

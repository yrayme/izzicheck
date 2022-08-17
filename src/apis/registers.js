import React, { useContext } from "react";
import configApp from "../../config/config";
import axios from 'axios';
import { AuthContext } from "../contexts/useAuthContext";


export const getRoles =  async () => {
    const { data } = await axios({
        method: "get",
        url: `${configApp.baseUrl}/roles?limit=${-1}`,
    })
    return data
}

export const getDocIdent =  async () => {
    const { data } = await axios({
        method: "get",
        url: `${configApp.baseUrl}/identity_document_types?limit=${-1}`, 
        headers: {
            "Authorization": `Bearer ${auth.token}`
        },
    })
    return data
}


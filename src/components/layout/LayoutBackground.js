import React, { useContext } from 'react';
import { Divider, Grid, Box, Typography, Button } from '@mui/material'
import { ThemeContext } from '../../contexts/useThemeContext';
import CustomButton from '../common/CustomButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function LayoutBackground({children, titleButton, onClick, icon, link}) {
    const router = useRouter();
    const { theme } = useContext(ThemeContext);
    const styleFondo = {
        backgroundImage: "url('/assets/bg.png')",
        backgroundSize: "100% 100%",
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
    }
    return (
        <Grid container sx={styleFondo}>
            <Grid item xs={12}>                
                <Box sx={{display: "flex", justifyContent: "space-between", px: 6, py:2}} >
                <Image 
                    src="/assets/izzi-check-blanco.png"
                    alt="logo"
                    width={74}
                    height={74}
                    onClick={() => { router.push('/') }}
                    style={{cursor: "pointer"}}
                />
                <CustomButton
                    title={titleButton}
                    startIcon={icon}
                    color={theme.colorSecundary}
                    onClick={onClick}
                    link={link}
                />
                </Box>                 
                    {/* <Divider sx={{background: theme.colorWhite, opacity: 0.4}}/>   */}
            </Grid>
            <Grid item xs={12} md={12}
                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <Box sx={{width: {xs:"80%", md:"50%"}, display: "flex", flexDirection: "column", alignItems: "center"}}> 
                    {children}
                </Box>
            </Grid>
        </Grid>
    )
}

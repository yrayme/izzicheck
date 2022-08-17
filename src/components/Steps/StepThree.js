import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import { Grid } from '@mui/material';
import CustomButton from '../common/CustomButton';
import SignUpContext from '../../contexts/SignUpContext';
import LayoutCard from '../layout/layoutCard';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function StepTwo() {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();

    const handleNext = () => {
        router.push('/login')
    }
    return (
        <LayoutCard
            width="100%"
        >
            <Box sx={{display: "flex", justifyContent: "center", mb: 3, mt: 2}}> 
                <Image 
                    src="/assets/artwork.png"
                    alt="logo"
                    width={259}
                    height={259}
                />
            </Box>
            <Typography variant='h4' sx={{color: theme.colorWhite, fontWeight: 600}}>¡Ya es hora!</Typography>
            <Typography variant='subtitle2' sx={{color: theme.colorWhite, fontWeight: 400, mt:2}}>
                Por favor confirma tu registro a través del enlace que fue enviado a tu correo electrónico correo@servidor.com para iniciar sesión.
            </Typography>
            <Grid container mt={3} spacing={2}>
                <Grid item xs={12} md={12} mt={0}>
                    <CustomButton                    
                        title={"Ok"}
                        color={theme.colorPrimary}
                        paddingX={6}
                        onClick={handleNext}
                    />
                </Grid>
            </Grid>
        </LayoutCard>
    )
}

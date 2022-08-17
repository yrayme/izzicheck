import React, { useContext } from 'react';
import WithAuth from '../../components/hoc/WithAuth';
import LayoutBackground from '../../components/layout/LayoutBackground';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ThemeContext } from '../../contexts/useThemeContext';
import { Box, Typography } from '@mui/material';
import Steps from '../../components/common/Steps';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function SignUp() {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
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
                <Box sx={{width: {xs: "100%", md:"60%"}, mt:-10}}>
                    <Box sx={{textAlign: "center",}}>
                        <Steps/>
                    </Box>
                </Box>       
            </LayoutBackground>
        </WithAuth>
    )
}

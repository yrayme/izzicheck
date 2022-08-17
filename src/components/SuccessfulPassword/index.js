import React, { useContext } from 'react'
import LayoutBackground from '../layout/LayoutBackground'
import LayoutCard from '../layout/layoutCard'
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import CustomButton from '../common/CustomButton';
import Image from 'next/image';

export default function SuccessfulPassword() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  return (
    <LayoutBackground 
      titleButton="Iniciar sesión"
      icon={
          <Image 
            src="/assets/icons/login.png"
            alt="logo"
            width={14}
            height={14}
          />}
          link={true}
    >
      <LayoutCard
        width="65%"
        marginTop={-100}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{color: theme.colorWhite, fontWeight: 600}}>Contraseña cambiada Exitosamente</Typography>
            <Typography variant='subtitle2' sx={{color: theme.colorWhite, fontWeight: 400, mt:2}}>
              Recuerda guardar muy bien tu contraseña y no mostrársela a nadie
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
              <Image 
                src="/assets/icons/check.png"
                alt="logo"
                width={62}
                height={62}
              />
          </Grid>
          <Grid item xs={12} md={12} mt={2}>
              <CustomButton                    
                  title={"Gracias, ir al inicio de sesión"}
                  fullWidth
                  color={theme.colorSecundary}
                  onClick={() => { router.push('/login')}}
              />
          </Grid>
        </Grid>
      </LayoutCard>
    </LayoutBackground>
  )
}

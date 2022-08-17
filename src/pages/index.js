import React, { useContext } from 'react';
import { Button, Grid, Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import WithAuth from '../components/hoc/WithAuth';
import LayoutBackground from '../components/layout/LayoutBackground';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../components/common/CustomButton';
import { ThemeContext } from '../contexts/useThemeContext';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router';
import SignUpContext from '../contexts/SignUpContext';


export default function Home() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const button = [
    {
      id: 1,
      title: "Registrar con Google",
      onClick: () => {alert("prueba")},
      icon: <GoogleIcon/>
    },
    {
      id: 2,
      title: "Registrar con Twitter",
      onClick: () => {alert("prueba")},
      icon: <TwitterIcon/>
    }
  ]
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
        <Box sx={{width: {xs: "100%", md:"50%"}}}>
          <Box sx={{display: "flex", justifyContent: "center", mb: 3, mt: -15}}> 
              <Image 
                  src="/assets/izzi-check-blanco.png"
                  alt="logo"
                  width={258}
                  height={258}
              />
          </Box>
          <CustomButton
            title={"Empezar"}
            color={theme.colorPrimary}
            endIcon={<KeyboardArrowRightIcon fontSize='small'/>}
            onClick={() => router.push('/signUp')}
            fullWidth
          />
          {/* {button.map(btn => {
            return (              
              <Button 
                key={btn.id}
                variant="outlined" 
                startIcon={btn.icon}
                fullWidth
                sx={{
                  mt: 3,
                  borderRadius: 20,
                  border: `1px solid ${theme.graylight1}`,
                  background: `${theme.grayGoogle} 0% 0% no-repeat padding-box`,
                  boxShadow: "0px 10px 20px #00000026",
                  textTransform: 'none', 
                  color: theme.colorWhite,
                  opacity: 1,
                  height: 45,
                  '&: hover':{
                    border: `1px solid ${theme.graylight1}`,
                  }
                }}
              >
              {btn.title}
              </Button>
            )
          })} */}
        </Box>
        <Box sx={{width: {xs: "100%", md:"100%"}, mt:6}}>
          <Divider sx={{background: theme.colorWhite, opacity: 0.4}}/>
        </Box>
        <Typography variant='subtitle2' sx={{mt:3, color: theme.colorWhite}}>Copyright © 2022.</Typography>
      </LayoutBackground>
    </WithAuth>
  )
}

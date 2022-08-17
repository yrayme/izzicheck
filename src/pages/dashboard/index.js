import React, { useContext } from 'react'
import WithAuth from '../../components/hoc/WithAuth';
import { Box, Button, Grid, Typography } from '@mui/material';
import FaqIcon from '../../components/icons/FaqIcon';
import CardDashboard from '../../components/cards/CardDashboard';
import Image from 'next/image';
import { ThemeContext } from '../../contexts/useThemeContext';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const cards = [
    {
      id: 1,
      name: "FAQ",
      icon: "/assets/icons/faq.png",
      description: "Resuelve cualquier duda"
    },
    {
      id: 2,
      name: "Manual de",
      name2: "usuario",
      icon: "/assets/icons/book.png",
      description: "Aprende facilmente"
    },
    {
      id: 3,
      name: "Tips",
      name2: "Izzicheck",
      icon: "/assets/icons/lightbulb.png",
      description: "Tips y recomendaciones"
    },
    {
      id: 4,
      name: "izzicheck",
      name2: "(Soporte)",
      icon: "/assets/icons/whatsapp.png",
      description: "Soporte en whatsApp"
    }
  ]
  return (
    <WithAuth safe={true}>
      <Box px={4} mt={10}
        sx={{
          '& .icon-dashboard':{
            color: "white",
            height: 40,
            width: 40
          }
        }}
      >
        <Grid container spacing={2}>
          {cards.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <CardDashboard data={card}/>
              </Grid>
            )
          })}
          <Grid item xs={12} mb={-10}>
            <Grid container>
              <Grid item xs={12} sm={12} md={7} mt={8} sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant='h2' sx={{color: theme.colorWhite, fontWeight: 500}}>Beneficios que te brinda Izzicheck</Typography>
                <Typography variant='h4' sx={{color: theme.colorPrimary, mt: 5, fontWeight: 500}}>
                  Valida los pagos (Zelle){" "}
                  <span style={{color: theme.colorWhite}}>recibidos, al instante y de manera segura.</span>
                </Typography>
                <Box mt={3} mb={3}>
                  <Button
                    variant='contained'
                    sx={{
                      color: theme.colorWhite,
                      textTransform: "none",
                      p:1.5
                    }}
                  >
                    Configuración
                  </Button>
                  <Button
                    variant='outlined'
                    sx={{
                      color: theme.colorWhite,
                      textTransform: "none",
                      ml:2,
                      p:1.5
                    }}
                  >
                    Reportes
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5} 
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                <Box sx={{display: {xs: "none", sm: "block"}, position: "absolute", bottom: 0}}>
                  <img src="/assets/Bitmap.png" alt="image"/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{width: "100%", maxWidth: "960px"}}>
                <Box sx={{position: "absolute", left: 0, bottom: 0, width: "100%", display: {xs: "none", sm: "block"}}}>
                  <img src="/assets/Wave.png" alt="image" style={{width: "100%"}}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </WithAuth>
  )
}

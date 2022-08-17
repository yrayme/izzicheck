import { Box, Card, Divider, Typography, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/useThemeContext'
import Image from 'next/image';

export default function CardDashboard({data}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Card 
            sx={{
                borderRadius: 5,
                backgroundColor: theme.grayCard,
                border: `1px solid ${theme.colorWhite}`,
                p: 2,
                height: 150,
                position: "relative",
                cursor: "pointer"
            }}
        >
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography
                    sx={{
                        color: theme.colorWhite,
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {data.name}
                </Typography>
                <Typography
                    sx={{
                        color: theme.colorWhite,
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {data.name2}
                </Typography>
            </Box>
            <Grid container sx={{ position: "absolute", mt: -1, bottom: 20}}>
                <Grid item xs={8} md={8} sx={{pr:2}}>
                    <Box sx={{mt: 4}}>
                        <Divider sx={{backgroundColor: theme.colorPrimary, height: 5, borderRadius: 5}}/>
                    </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Image 
                        src={data.icon}
                        alt="logo"
                        width={42}
                        height={45}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography
                        sx={{
                            fontSize: "11px",
                            color: theme.colorWhite
                        }}
                    >
                        {data.description}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

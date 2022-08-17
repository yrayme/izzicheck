import React, { useContext } from 'react'
import Image from 'next/image';
import { Grid, Typography, Box } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';

export default function CardNotifications({data}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Grid container spacing={2} mb={1}>
            <Grid item xs={4} md={2}>
                <Box>                                        
                    <Image 
                        src={data.foto}
                        alt="logo"
                        width={40}
                        height={40}
                    />
                </Box>
            </Grid>
            <Grid item xs={8} md={10}>
                <Grid container>
                    <Grid item xs={7} md={12} sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography 
                            sx={{color: theme.colorItemMenu, fontSize: "14px", fontWeight: 600}}
                        >
                            {data.name}
                        </Typography>
                        {data.amount && (
                            <Typography 
                                sx={{color: theme.colorPrimary, fontSize: "14px", fontWeight: 600}}
                            >
                                {`+$${data.amount}`}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={12} mt={-1}>
                        <Typography 
                            sx={{color: theme.colorVoucher, fontSize: "10px", fontWeight: 600}}
                        >
                            {`Comprobante: ${data.voucher}`}
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

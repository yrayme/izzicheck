import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeContext } from '../../contexts/useThemeContext';

const AntSwitch = styled(Switch)(({ theme, colorprimary, colorwhite }) => ({
    width: 30,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 18,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2.5,
      color: "black",
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: colorprimary,
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: colorwhite,
        },
      },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 13,
        height: 13,
        borderRadius: 610,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: colorwhite,
        boxSizing: 'border-box',
    },
}));
export default function CustomSwitch({onChange, title, value}) {
    const { theme } = useContext(ThemeContext);
    const white = theme.colorWhite;
    const primary = theme.colorPrimary;
    return (                    
        <Stack direction="row" spacing={1} alignItems="center">
            <AntSwitch 
                value={value}
                id="remember"
                inputProps={{ 'aria-label': 'ant design' }} 
                onChange={onChange}
                colorwhite={white}
                colorprimary={primary}
            />
            <Typography variant='subtitle2' sx={{color: theme.colorWhite}}>{title}</Typography>
        </Stack>
    )
}

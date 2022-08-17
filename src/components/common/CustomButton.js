import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/useThemeContext'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { StateContext } from '../../contexts/useStateContext';

export default function CustomButton({
    startIcon, 
    endIcon, 
    title, 
    onClick, 
    color, 
    fullWidth, 
    paddingX, 
    disabled,
    link
}) {
    const { theme } = useContext(ThemeContext);
    const { setLoginType } = useContext(StateContext);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
            <Button 
                variant="contained" 
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={link ? handleMenu : onClick}
                fullWidth={fullWidth}
                disabled={disabled}
                sx={{
                    background: theme.colorWhite,
                    color: color,
                    borderRadius: 20,
                    textTransform: "none",
                    boxShadow: '0px 10px 20px #00000026',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    px: paddingX,
                    height: 45,
                    '&: hover':{
                        background: theme.colorWhite,
                        opacity: 1
                    }
                }}
            >
                {title}
            </Button>
            
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            >
                <MenuItem onClick={() => { router.push('../login'); setLoginType(true); }}>Administrador</MenuItem>
                <MenuItem onClick={() => { router.push('../login'); setLoginType(false); }}>Empleado</MenuItem>
            </Menu>
        </>
    )
}

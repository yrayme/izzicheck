
import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Divider, Badge, Grid } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import { AlertContext } from '../../contexts/useAlertContext';
import { AuthContext } from '../../contexts/useAuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Popover from '@mui/material/Popover';
import CardNotifications from './CardNotifications';
import PopoverComponent from './Popover';
import { StateContext } from '../../contexts/useStateContext';

export default function Navbar() {
    const router = useRouter()
    const { theme } = useContext(ThemeContext);
    const { setLoginType } = useContext(StateContext);
    const { onOpenAlertDialog, onCloseAlertDialog } = useContext(AlertContext);
    const { logout, auth } = useContext(AuthContext);
    const { data } = auth;
    const [anchorEl, setAnchorEl] = useState(null);

    const goToLanding = () => {
      onOpenAlertDialog({
        open: true,
        title: 'Cerrar sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        btnClose: 'CANCELAR',
        btnSuccess: 'CERRAR SESIÓN',
        status: "success",
        onSuccess: () => {
          onCloseAlertDialog();
          logout(router.replace('/'));
          setLoginType(data?.role?.id === 3 ? true : false);
          localStorage.removeItem('menu');
        },
        onClose: () => onCloseAlertDialog(),
      })
    };
    
    const handleNotifications = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const notifications = [
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
            amount: "89.00"
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
            amount: "89.00"
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
            amount: "89.00"
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
            amount: "89.00"
        },
    ]
    return (        
        <div>
            <Box
                sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        borderRadius: 1,
                        position: "absolute",
                        top: 20,
                        right: 20,
                    }}
            >
                <Avatar
                    alt="Y Sharp"
                    // src="/assets/icons/picture.png"
                    sx={{ width: 40, height: 40 }}
                /> 
                <Typography sx={{mx:1, color: theme.colorWhite, fontSize: "14px"}}>{data?.name}</Typography>
                <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor: theme.colorWhite, mx: 3}} />
                <Badge badgeContent={""} color="error" variant="dot">                
                    <IconButton 
                        sx={{p:0}}
                        onClick={handleNotifications}
                    >  
                        <Image 
                            src="/assets/icons/notifications.png"
                            alt="logo"
                            width={16}
                            height={22}
                        />
                    </IconButton>  
                </Badge>     
                <IconButton
                    sx={{mx:3}}
                    onClick={goToLanding}
                >           
                    <Image 
                        src="/assets/icons/logout.png"
                        alt="logo"
                        width={20}
                        height={20}
                    />
                </IconButton>
            </Box>                  
            <PopoverComponent
                id={id}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            >
                <Box sx={{pt:2, px: 1}}>
                    {notifications.map((not, index) => {
                        return (
                            <CardNotifications
                                key={index}
                                data={not}
                            />
                        )
                    })}
                </Box>                
            </PopoverComponent>
        </div>
    )
}

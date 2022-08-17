import React from 'react';
import { Popover, Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';

export default function PopoverComponent({ children, id, open, anchorEl, setAnchorEl, width, padding, title }) {
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                style: {
                    borderRadius: "15px",
                    maxHeight: width ? 550 : 500,
                    width: width ? width : 312,
                    padding: padding ? padding : 10
                },
            }}
        >
            <Box>                
                <Box sx={{display: "flex", justifyContent: title ? "space-between" : "flex-end", p: 2}}>
                {title && (
                        <Box sx={{display: "flex"}}>
                            <Box sx={{mt: 0.5, mr: 1}}>
                                <Image 
                                    src="/assets/icons/calendar.png"
                                    alt="logo"
                                    width={16}
                                    height={16}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{fontWeight: "bold"}}>Escoge una fecha</Typography>
                            </Box>
                        </Box> 
                )}                       
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton 
                            sx={{p:0}}
                            onClick={handleClose}
                        >  
                            <Image 
                                src="/assets/icons/close-icon.png"
                                alt="logo"
                                width={18}
                                height={18}
                            />
                        </IconButton>
                    </Box>
                </Box>
                {children}
            </Box>
        </Popover>
    )
}

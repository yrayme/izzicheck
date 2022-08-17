import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/useThemeContext'

export default function LayoutCard({ children, marginTop, width }) {
    const { theme } = useContext(ThemeContext);
    return (
        <Box sx={{width: {xs: "100%", md: width}, mt:{marginTop}}}>
            <Box
                sx={{
                    borderRadius: "30px",
                    backgroundColor: theme.grayCard,
                    textAlign: "center",
                    px: 3,
                    py: 5
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

import { Box } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import MenuLeft from '../common/MenuLeft'
import Navbar from '../common/Navbar';
import LayoutBackground from './LayoutBackground'

export default function LayoutMenuLeft(props) {
  const { children } = props;
  const styleFondo = {
      backgroundImage: "url('/assets/bg2.png')",
      backgroundSize: "100% 100%",
      height: {xs:"100%", md: "100vh"},
      position: 'relative'
  }

  return (
    <Box sx={styleFondo}>
      <Main>
          <MenuLeft />
          <DivChildren>
            <Navbar/>
              {children}
          </DivChildren>
      </Main>
      <Box sx={{position: "absolute", left: 0, bottom: 0, width: "100%", display: {xs: "none", md: "block"}}}>
        <img src="/assets/Wave.png" alt="image" style={{width: "100%"}}/>
      </Box>
    </Box>
  )
}

const Main = styled.main`
  // display: grid;
  grid-template-columns: auto 1fr;
  // height: 100vh;
  // padding: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    display: grid;
    position: relative;
  }
`
const DivChildren = styled.div`
  height: 100vh;
  @media (max-width: 768px) {
    overflow-y: scroll;
  }  
`;
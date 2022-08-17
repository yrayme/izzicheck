import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import styled, { css } from 'styled-components'
import { ThemeContext } from '../../contexts/useThemeContext'
import { StateContext } from '../../contexts/useStateContext'
import { Box } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function ItemMenu(props) {
  const { label, link, active, onClick, children, marginLeft, id, iconRight, open } = props;
  const { state } = useContext(StateContext)
  const { theme } = useContext(ThemeContext)
  const router = useRouter()

  const handleLink = () => {
    router.push(link);
  }

  return (
    <>
      <DivContain
        primary={active}
        active={window.location.pathname === link}
        onClick={(event) => (link ? handleLink() : onClick(event))}
        subMenu={marginLeft}
        color={theme.colorSecundary}
        colors={{
          text: theme.colorItemMenu,
          subText: theme.colorSubItem
        }}
      >
        {children}
        <DivSpan>
          {(state.menuActive || active) && (
            <Typography
              // variant="body1"
              sx={{ 
                marginLeft: marginLeft || '7px',
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {label}
            </Typography>
          )}
          {iconRight && state.menuActive && (
            <Box sx={{position: "absolute", right: 20, top: 5}}>
              {open ?                
               <KeyboardArrowLeftIcon sx={{ fontSize: 22, color: "gray" }} />
              :               
              <KeyboardArrowRightIcon sx={{ fontSize: 22, color: "gray" }} />
              }             
            </Box>
            
          )}
        </DivSpan>
      </DivContain>
      {/* <DivBorder primary={active} /> */}
    </>
  )
}

export const DivContain = styled.div`
  display: grid;
  cursor: pointer;
  border-left: 3px solid;
  border-left-color: transparent;
  grid-template-columns: ${(props) => (props.subMenu ? '1fr' : '53px 1fr')};
  padding: ${(props) => (props.primary ? '10px 0px' : '10px 0px')};
  color: ${(props) => (props.subMenu ? "#7865897F" : "#3A0E60")};
  & .icon-menuleft {
    color: ${(props) => (props.active ? 'white' : '#7F1FD4')};
    width: 21px;
    height: 21px;
  } 
  &:hover {
    // border-left-color: #ffffff;
    background-color: ${(props) => (props.color)};
    border-radius: 10px;
    color: white;
    & .icon-menuleft {
      color: white;
    } 
    & .MuiSvgIcon-root {
      color: white;
    }
    margin: 5px 0px;
  }
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => (props.color)};
      border-radius: 10px;
      color: white;
      & .icon-menuleft {
        color: white;
      } 
      & .MuiSvgIcon-root {
        color: white;
      }
    `}
`

const DivSpan = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const Span = styled.span`
  color: #ffffff;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
  padding-left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: 'Simply-Rounded-Bold';
`

const DivBorder = styled.div`
  width: 90%;
  margin: 0 5%;
  transition: 1s;
  border-bottom: ${(props) =>
    props.primary ? '1px solid #f1f2f3' : '1px solid transparent'};
`

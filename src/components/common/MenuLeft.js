import React, { useContext, useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ThemeContext } from '../../contexts/useThemeContext'
import { StateContext } from '../../contexts/useStateContext'
import ItemMenu from './ItemMenu'
import { Box, Divider, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PieChartIcon from '@mui/icons-material/PieChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';
import UserIcon from '../icons/UserIcon';
import Image from 'next/image';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { AuthContext } from '../../contexts/useAuthContext';
import Popover from '@mui/material/Popover';
import BranchesIcon from '../icons/BranchesIcon';
import FaqIcon from '../icons/FaqIcon';

export default function MenuLeft() {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [ openSubMenu, setOpenSubMenu ] = useState({});
  const { state, isActiveMenu } = useContext(StateContext);
  const { auth } = useContext(AuthContext);
  const { data } = auth;
  const [menu, setMenu] = useState([]);
  const { menuActive } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [arraySubmenu, setSubmenu] = useState([]);

  const handleClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setSubmenu(menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const goToHome = () => router.push('/dashboard');

  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('menu'))){
      const sidebarMenu = JSON.parse(localStorage.getItem('menu'));
      sidebarMenu.map(men => {
        men.children.map(child => {
          switch (child.id) {
            case "1.1":
              child.icon = <UserIcon className="icon-menuleft"/>,
              child.to = "/users"
              break;
            case "1.2":
              child.icon = <BranchesIcon className="icon-menuleft"/>,
              child.to = "/branches"
              break;
            case "1.3":
              child.icon = <PointOfSaleOutlinedIcon sx={{ fontSize: 22, color: theme.colorSecundary }} />,
              child.to = "/boxes"
              break;
            case "1.4":
              child.icon = <AttachEmailOutlinedIcon sx={{ fontSize: 22, color: theme.colorSecundary }} />,
              child.to = "/email"
              break;  
            case "1.5":
              child.icon = <QrCodeIcon sx={{ fontSize: 22, color: theme.colorSecundary }} />,
              child.to = "/cashier/code"
              break; 
            case "2.1":
              child.icon = <FaqIcon className="icon-menuleft"/>,
              child.to = "/"
              break; 
            case "3.1":
              child.icon = <KeyIcon sx={{ fontSize: 22, color: theme.colorSecundary }} />,
              child.to = false,
              child.iconRight = true,              
              child.onClick= true,
              child.subMenu= [
                {
                  id: 1,
                  name: "Conciliación de pagos"
                },
                {
                  id: 2,
                  name: "Pagos confirmados- cobrados"
                },
                {
                  id: 3,
                  name: "Cobros pendientes"
                },
                {
                  id: 4,
                  name: "Detalle de pago en TDC"
                } 
              ]
              break; 
            case "3.2":
              child.icon = <BadgeIcon sx={{ fontSize: 22, color: theme.colorSecundary }} />,
              child.to = "/report"
              break;          
            default:
              break;
          }
        })
      })
      sidebarMenu[sidebarMenu.length - 1].divider = true;
      setMenu(sidebarMenu);
    }
}, []);

  const subMenu = (id) => {
    setOpenSubMenu({ ...openSubMenu, [id]: !openSubMenu[id] });
  }
  return (
    <div >
      <Nav
        primary={menuActive}
      >
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, mt: menuActive ? -1 : 0}}>        
          <ContainImg>
            <Img
              src="/assets/logo.png"
              alt="izziCheck"
              primary={menuActive}
              onClick={goToHome}
            />
          </ContainImg>
          {menuActive &&(
            <Typography variant='h6' sx={{marginLeft: 1}}>{data.role?.name}</Typography>
          )}
          {menuActive &&(
            <Button onClick={() => isActiveMenu()}>          
              <Image 
                src="/assets/icons/close-menu.png"
                alt="logo"
                width={31}
                height={31}
              />
            </Button>
          )}
        </Box>
        <Divider sx={{color: theme.colorDivider}}/>
        {!menuActive && (
          <Box
            onClick={() => isActiveMenu()}
            sx={{
              cursor: "pointer",
              width: 25,
              height: 25,
              borderRadius: 50,
              backgroundColor: theme.colorPrimary,
              position: "absolute",
              right: -10,
              top: 67,
            }}  
          >
            <KeyboardArrowRightIcon sx={{color: theme.colorWhite}}/>
        </Box>
        )}
        <DivMenu>
          {menu && menu.map((men, index) => (
            <div key={men.id}>          
              {menuActive && (
              <Box sx={{pt:1, pb:2}}>
                <Typography sx={{color: theme.colorSubItem, fontSize: "12px", fontWeight: 600, pl: 2,}}>{men.name}</Typography>
              </Box>
              )}
              {men.children.map((child, index) => {
                return (                
                  <div key={child.id}>
                    <ItemMenu
                      onClick={(event) => child.onClick && handleClick(event, child.subMenu)}
                      id={child.id}
                      link={child.to}
                      label={child.name}
                      active={menuActive}
                      iconRight={child.iconRight}
                      open={openSubMenu[child.id]}
                    >
                      <DivIcon>
                        {child.icon}
                      </DivIcon>
                    </ItemMenu>
                    {openSubMenu[child.id] && menuActive && (
                      <>
                        {child?.subMenu.map((sub) => (           
                            <ItemMenu
                              key={sub.id}
                              id={sub.id}
                              marginLeft= "6vh"
                              link={sub.link}
                              label={sub.name}
                              active={menuActive}
                            />

                        ))}
                      </>
                    )}  
                  </div>
                )
              })}    
              {menuActive && !men.divider && (
                  <Divider sx={{color: theme.colorDivider, my:2}}/> 
              )}   
            </div>   
          ))}
        </DivMenu>
      </Nav>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        sx={{ml:1.5}}
        PaperProps={{
            style: {
                borderRadius: "15px",
                maxHeight: 300,
                width: 312,
                padding: 10,
                overflow: "hidden",
            },
        }}
        >
          {arraySubmenu.length > 0 && arraySubmenu.map((sub) => (           
            <ItemMenu
              key={sub.id}
              id={sub.id}
              marginLeft= "2vh"
              link={sub.link}
              label={`- ${sub.name}`}
              active={true}
            />
        ))}
      </Popover>
    </div>
  )
}

// const Nav = styled.nav`
//   display: flex;
//   transition: 0.5s;
//   flex-direction: column;
//   height: ${(props) => (props.primary ? 'auto' : '450px')};
//   background: white;
//   border-radius: 20px;
//   width: ${(props) => (props.primary ? '260px' : '60px')};
//   // padding: ${(props) => (props.primary ? '11px' : '0px')};
//   // position: relative;
//   @media (max-width: 768px) {
//     width: ${(props) => (props.primary ? '140%' : '60px')};
//     transition: initial;
//     position: absolute;
//     overflow: hidden;
//     z-index: 400;
//     bottom: 0;
//     top: 0;
//   }
// `
const Nav = styled.nav`
  display: flex;
  transition: 0.5s;
  flex-direction: column;
  height: ${(props) => (props.primary ? '600px' : '450px')};
  background-repeat: no-repeat;
  width: ${(props) => (props.primary ? '300px' : '60px')};
  background: white;
  border-radius: 20px; 
  padding: ${(props) => (props.primary ? '11px' : '0px')};
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  @media (max-width: 768px) {
    width: ${(props) => (props.primary ? '300px' : '60px')};
    transition: initial;
    position: absolute;
    overflow: hidden;
    z-index: 400;
    bottom: 0;
    top: 0;
  }
`

const ContainImg = styled.div`
  display: flex;
  height: 80px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  // :hover {
  //   border-left-color: #ffffff;
  //   background-color: rgba(255, 255, 255, 0.2);
  // }
`

const Img = styled.img`
  transition: 0.8s;
  object-fit: cover;
  width: ${(props) => (props.primary ? '52px' : '40px')};
`

const DivMenu = styled.div`
  display: flex;
  padding: 10px 0 0;
  flex-direction: column;
`

const DivIcon = styled.div`
  margin: auto;
  display: flex;
  padding: 4px;
`

const Button = styled.button`
  border: 0;
  width: 40px;
  display: flex;
  margin: 10px 7px;
  margin-left: 11px;
  cursor: pointer;
  background-color: transparent;
`

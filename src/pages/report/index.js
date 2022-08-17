import React, { useContext, useState, useEffect } from 'react'
import WithAuth from '../../components/hoc/WithAuth';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/useThemeContext';
import CustomButton from '../../components/common/CustomButton';
import PopoverComponent from '../../components/common/Popover';
import Image from 'next/image';
import CustomTextField from '../../components/common/CustomTextField';
import CardNotifications from '../../components/common/CardNotifications';
import { Calendar, DateRangePicker   } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'moment/locale/es'
import { addDays,
    endOfDay,
    startOfDay,
    startOfYear,
    startOfMonth,
    endOfMonth,
    endOfYear,
    addMonths,
    addYears,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MomentUtils from '@date-io/moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment'; 
// import turkish from 'react-date-range/locale/tr';
import { es } from 'date-fns/locale'
import CustomizedTables from '../../components/common/Table';
import TableContext from '../../contexts/TableContext';
import { StateContext } from '../../contexts/useStateContext';
import {
  defaultStaticRanges,
  defaultInputRanges
} from "react-date-range/dist/defaultRanges";
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Report() {
    const { theme } = useContext(ThemeContext);
    const { setTableData } = useContext(TableContext);
    const { state, transactionTypeId } = useContext(StateContext);
    const { menuActive } = state;
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElDate, setAnchorElDate] = useState(null);
    const [search, setSearch] = useState("");
    const open = Boolean(anchorEl);
    const openDate = Boolean(anchorElDate);
    const id = open ? 'simple-popover' : undefined;
    const idDate = openDate ? 'simple-popover' : undefined;
    const [stateDate, setState] = useState([
      {
        startDate: new Date(),
        // endDate: addDays(new Date(), 7),
        endDate: new Date(),
        color:"#7F1FD4",
        key: 'selection',
        autoFocus: true,
      }
    ]);
    
    
    const staticRangesLabels = {
        "Today": "Hoy",
        "Yesterday": "Ayer",
        "This Week": "Esta semana",
        "Last Week": "Semana pasada",
        "This Month": "Este mes",
        "Last Month": "Mes pasado"
    };
    
    const inputRangesLabels = {
        "days up to today": "días hasta hoy",
        "days starting today": "días a partir de hoy"
    };
    
    function translateRange(dictionary) {
        return (item) =>
        dictionary[item.label] ? { ...item, label: dictionary[item.label] } : item;
    }
    
    const esStaticRanges = defaultStaticRanges.map(translateRange(staticRangesLabels));
    const esInputRanges = defaultInputRanges.map(translateRange(inputRangesLabels));
  
    const stylesIcon = {
        position: "absolute", 
        top:21, 
        left: 4,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        '& svg': {
            my: 1.2,
        },
        '& hr': {
            mx: 0.9,
        },
    }

    const notifications = [
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
        },
        {
            id: 1,
            name: "John Tartar",
            foto: "/assets/icons/picture2.png",
            voucher: "32145698744",
        },
    ]

    useEffect(() => {
        setTableData({
            title: "",
            name: "report",
            type: 1, //Funcionalidad añadir reporte
            rows: [
                {
                    user: "prueba",
                    amount: "89.00",
                    date: "hoy",
                    bank: "Banco of America",
                    code: "5dg67rldl",
                    id: "report"
                }
            ],
        })
    }, [])
    
    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleOpenDate = (event) => {
        setAnchorElDate(event.currentTarget);
    }

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearch(value);
    }

    const handlefilter = () => {
        setAnchorEl(null);
    }

    const handleSelect = (date) => {
        console.log(date); // native Date object
    }

    const popoverDate = () => {
        return(        
            <PopoverComponent
                id={idDate}
                open={openDate}
                anchorEl={anchorElDate}
                setAnchorEl={setAnchorElDate}
                width="600px"
                padding="0px"
                title={true}
            >
                <Box sx={{px:2}}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateRangePicker
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={stateDate}
                            direction="horizontal"
                            locale={es}
                            staticRanges={[
                                ...esStaticRanges,
                                {
                                label: "Último año",
                                range: () => ({
                                    startDate: startOfYear(addYears(new Date(), -1)),
                                    endDate: endOfYear(addYears(new Date(), -1))
                                }),
                                isSelected(range) {
                                    const definedRange = this.range();
                                    return (
                                    isSameDay(range.startDate, definedRange.startDate) &&
                                    isSameDay(range.endDate, definedRange.endDate)
                                    );
                                }
                                },
                                {
                                label: "Este año",
                                range: () => ({
                                    startDate: startOfYear(new Date()),
                                    endDate: endOfDay(new Date())
                                }),
                                isSelected(range) {
                                    const definedRange = this.range();
                                    return (
                                    isSameDay(range.startDate, definedRange.startDate) &&
                                    isSameDay(range.endDate, definedRange.endDate)
                                    );
                                }
                                }
                            ]}
                            inputRanges={[]}
                            className="prueba"
                        />    
                    </LocalizationProvider> 
                    <Box sx={{display: "flex", justifyContent: "flex-end", p: 2}}>
                        <Button
                            variant='contained'
                            color="secondary"
                            startIcon={<CheckIcon sx={{fontSize: 10}}/>}
                            sx={{
                                textTransform: "none",
                                mr: -2
                            }}
                            onClick={() => setAnchorElDate(null)}
                        >
                            Aplicar                            
                        </Button>                        
                    </Box>  
                </Box>
            </PopoverComponent>
        )
    }

    const popoverFilter = () => {
        return (
            <PopoverComponent
                id={id}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            >
                <Box sx={{px:2}}>
                    <CustomTextField
                        placeholder="Escribe un nombre"  
                        colorText={theme.colorSubItem} 
                        backgroundColor={theme.colorSearch}
                        iconleft="true"                     
                        id="password"
                        value={search}
                        onChange={handleSearch}                                    
                    >
                        <Box style={stylesIcon}>
                            <IconButton  
                                onClick={handlefilter}
                                sx={{cursor: "pointer"}}
                            >
                                <Image 
                                    src="/assets/icons/search.png"
                                    alt="logo"
                                    width={18}
                                    height={18}
                                />
                            </IconButton>
                        </Box>
                    </CustomTextField>                                    
                    <Box sx={{pt:3, px: 1}}>
                        {notifications.map((not, index) => {
                            return (
                                <CardNotifications
                                    key={index}
                                    data={not}
                                />
                            )
                        })}
                    </Box>  
                </Box>
            </PopoverComponent>   
        )
    }

    const getDate = () => {
        moment.locale('es');
        const startDate = moment(stateDate[0].startDate);
        const formatStart = startDate.format("ddd D MMM");
        const endDate = moment(stateDate[0].endDate);
        const formatEnd = endDate.locale("es").format("ddd D MMM"); 
        return(
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <span>{formatStart}</span>
                <KeyboardArrowRightIcon sx={{color: theme.colorDivider}}/>
                <span>{formatEnd}</span>
            </Box>
        )
    }
    return (
        <WithAuth safe>
            <Box sx={{mt: 7, pl:{xs: 8, md: 5}}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{color: theme.colorWhite, fontSize: "40px", fontWeight: 600}}>Reportes de pago</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} mt={1.5}>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>                        
                            <CustomButton
                                title={<span>filtrar por usuario <span style={{fontWeight: 400}}>{search}</span></span>} 
                                color={theme.colorItemMenu}
                                endIcon={   
                                    search && (                                 
                                        <IconButton 
                                            sx={{px:1}}
                                            onClick={() => {setSearch(""); setAnchorEl(null)}}
                                        >  
                                            <Image 
                                                src="/assets/icons/close-icon.png"
                                                alt="logo"
                                                width={16}
                                                height={16}
                                            />
                                        </IconButton>
                                    )
                                }
                                onClick={handleOpenPopover}
                            />
                            {open && popoverFilter()}
                            <Box sx={{ml: 3}}>
                                <CustomButton
                                    title={getDate()} 
                                    color={theme.colorItemMenu}
                                    startIcon={                                  
                                            <Box 
                                                sx={{pr:1,}}
                                            >  
                                                <Image 
                                                    src="/assets/icons/calendar.png"
                                                    alt="logo"
                                                    width={16}
                                                    height={16}
                                                />
                                            </Box>
                                    }
                                    onClick={handleOpenDate}
                                />                               
                            </Box>
                        </Box>
                        {openDate && popoverDate()}
                    </Grid>
                    <Grid item xs={12} md={12} mt={-2}>
                        <Box sx={{maxWidth:{sm: "100%" , xs: menuActive ? 150 : 250}}}>
                            <CustomizedTables/>
                        </Box>
                    </Grid>
                </Grid>
            </Box> 
        </WithAuth>
    )
}

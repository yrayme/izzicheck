import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeContext } from '../../contexts/useThemeContext';
import TableContext from '../../contexts/TableContext';
import { COLUMNS } from '../../constants';
import { Grid, Typography, Box, IconButton, Tooltip, Alert, TextField } from '@mui/material';
import CustomButton from './CustomButton';
import { StateContext } from '../../contexts/useStateContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DialogUsers from '../dialogs/DialogUsers';
import DialogBranches from '../dialogs/DialogBranches';
import DialogBoxes from '../dialogs/DialogBoxes';
import { AlertContext } from '../../contexts/useAlertContext';
import configApp from '../../../config/config';
import axios from 'axios';
import { AlertSimpleContext } from '../../contexts/useAlertSimpleContext';
import {FormControl, InputLabel, FilledInput, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TablePagination } from '@mui/material';
import { AuthContext } from '../../contexts/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import DialogCode from '../dialogs/DialogCode';
import DialogEmail from '../dialogs/DialogEmail';
import { useRouter } from 'next/router';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: "#7865897F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "none"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({search, setSearch, loadingTable, change, setChange, children}) {
    const router = useRouter();
    const { theme } = useContext(ThemeContext);
    const { tableData, setTableData } = useContext(TableContext);
    const { onOpenAlertDialog, onCloseAlertDialog } = useContext(AlertContext);
    const { auth, logout } = useContext(AuthContext);
    const { onOpenAlert } = useContext(AlertSimpleContext);
    const [rows, setRows] = useState([]);
    const [data, setData] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(
      {
        users: false,
        boxes: false,
        branches: false,
        payment: false,
        email: false,
      }
    );

    const { state } = useContext(StateContext);
    const { menuActive } = state;

    const handleCreate = () => {
      handleVisibilityDialog("show", tableData.name);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event, value) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    
    const handleVisibilityDialog = (value, name) => {
      switch (value) {
          case "show":
            setOpenDialog({...openDialog, [name]: true});
              break;
          case "hide":
            setOpenDialog({...openDialog, [name]: false});
              break;
          default:
              break;
      }
    }

    const handleUpdate = (id) => {
      switch (tableData.type) {
        case 2: //Actualizar usuario
          getList(id, "operators")
          break;
        case 3: //Actualizar Caja
          getList(id, "cash_registers");
          break;
        case 4: //Actualizar sucursal
          getList(id, "branch_offices");
          break;
        case 6: //Actualizar email
          getList(id, "directories");
          break;
        default:
          break;
      }
    }

    const handleDelete = (id) => {
      let message = "";
      let handleFunction = "";
      switch (tableData.type) {
        case 2: //Eliminar usuario
          message = '¿Estás seguro de que deseas eliminar un usuario?';
          break;
        case 3: //Eliminar caja
          message = '¿Estás seguro de que deseas eliminar una caja?';
          break;    
        case 4: //Eliminar sucursal
          message = '¿Estás seguro de que deseas eliminar una sucursal?';
          break;     
        case 5: //Eliminar pago
          message = '¿Estás seguro de que deseas eliminar un pago?';
          break;     
        case 6: //Eliminar correo
          message = '¿Estás seguro de que deseas eliminar un correo?';
          break;        
        default:
          break;
      }
      onOpenAlertDialog({
        open: true,
        title: 'Estimado usuario',
        message: message,
        btnClose: 'CANCELAR',
        btnSuccess: 'ACEPTAR',
        status: "success",
        onSuccess: () => {
          onCloseAlertDialog();
          switch (tableData.type) {
            case 2: //Eliminar usuario
              deleteList(id, "operators");
              break;
            case 3: //Eliminar caja
              deleteList(id, "cash_registers");
              break;    
            case 4: //Eliminar sucursal
              deleteList(id, "branch_offices")
              break;     
            case 6: //Eliminar correo
              deleteList(id, "directories")
              break;      
            default:
              break;
          }          
        },
        onClose: () => onCloseAlertDialog(),
      })
    }

    useEffect(() => {
      setRows(tableData.rows);  

      let totalPages = Math.trunc(tableData.rows.length / rowsPerPage);

      if(tableData.rows.length % rowsPerPage != 0){
          totalPages = totalPages + 1;
      }
      setTotalPages(totalPages)
    }, [tableData])
    

    const searchTable = (e) => {
      const { value } = e.target;
      setSearch(value);
    }

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const getList = (id, name) => {
      setLoading(true);
      axios({
          method: "get",
          url: `${configApp.baseUrl}/${name}/${id}`,
          headers: {
              "Authorization": `Bearer ${auth.token}`
          },
      }).then(function (response) {
        setLoading(false);
        const { data } = response.data;
        handleVisibilityDialog("show", tableData.name);
        setData(data);
      })
      .catch(function (error) {
        if(error.response.status === 401){
            return logout(router.replace('/'));
        }
        setLoading(false);
        onOpenAlert({
            open: true,
            message: error.response.data.message,
            status: 'error'
        })
      })
    }

    const deleteList = (id, name) => {
      setLoading(true);
      axios({
          method: "delete",
          url: `${configApp.baseUrl}/${name}/${id}`,
          headers: {
              "Authorization": `Bearer ${auth.token}`
          },
      }).then(function (response) {
        setLoading(false);
        setSearch(" ");
        setChange(response);
        onOpenAlert({
            open: true,
            message: response.data.message,
            status: 'success'
        })
      })
      .catch(function (error) {
        if(error.response.status === 401){
            return logout(router.replace('/'));
        }
        setLoading(false);
        onOpenAlert({
            open: true,
            message: error.response.data.message,
            status: 'error'
        })
      })
    }
    
    return ( 
      <>    
        <Grid container mt={8} pl={{xs: 7, md: 0}}> 
          <Grid item xs={12} md={8}>
              <Typography sx={{color: theme.colorWhite, fontSize: "40px", fontWeight: 600}}>{tableData.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>   
          <Grid item xs={12}>       
            {loadingTable ? (
              <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress color="secondary" sx={{fontSize: 30}}/>
              </Box>
              ):( 
              <Grid container>
                {tableData.add !== false ?
                  <Grid item xs={12} md={12}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <CustomButton
                      title="Añadir"
                      onClick={handleCreate}
                      startIcon={     
                            <AddCircleOutlineOutlinedIcon color="secondary"/>
                      }
                    />
                  </Grid>
                  :
                  <Grid item xs={12}>
                  </Grid>
                }
                <Grid item xs={12} sm={5} md={4} mt={3}>
                  <FormControl>
                      <InputLabel style={{color: theme.colorWhite}}>Búsqueda</InputLabel>
                      <FilledInput
                        onChange={(event) => searchTable(event)}
                        id="filled-adornment-password"
                        style={{
                            borderRadius: '2vh',
                            height: 45,
                            backgroundColor: theme.graylight1,
                            width: "100%",
                        }}
                        fullWidth={true}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SearchIcon color="secondary"/>
                                </IconButton>
                            </InputAdornment>
                        }
                        color="secondary"
                        value={search}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Box >
                    <TableContainer component={Paper} sx={{borderRadius: 5, }}>
                      <Table sx={{ minWidth: 650, overflowX: "scroll"}} aria-label="caption table">
                          <TableHead>
                            <TableRow>
                                {COLUMNS[tableData.name] && COLUMNS[tableData.name].map((column, index) => {
                                    return(
                                        <StyledTableCell align="left" key={index} sx={{textAlign: "center"}}>{column.label}</StyledTableCell>
                                    )
                                })}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                              <StyledTableRow key={index}> 
                                  {COLUMNS[tableData.name].map((column) => {
                                      const value = row[column.id];
                                      if (column.id !== "actions") {
                                          return (
                                              <StyledTableCell key={column.id} align={"center"}>
                                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                              </StyledTableCell>
                                          );
                                      } else {
                                        return (
                                          <StyledTableCell component="th" scope="row" key={column.id} sx={{display: "flex"}}>
                                            <>
                                              {row["edit"] &&
                                                  <Tooltip title="Detalle">
                                                      <IconButton onClick={() => handleUpdate(row.id)} disabled={loading}>
                                                          <VisibilityOutlinedIcon color="secondary" />
                                                      </IconButton>
                                                  </Tooltip>
      
                                              }
                                              {row["delete"] &&
                                                  <Tooltip title="Eliminar">
                                                      <IconButton onClick={() => handleDelete(row.id)} disabled={loading}>
                                                          <DeleteOutlineOutlinedIcon color="secondary" />
                                                      </IconButton>
                                                  </Tooltip>
      
                                              }
                                            </>
                                          </StyledTableCell>
                                        )
                                      }
                                  })}
                              </StyledTableRow>
                          ))}
                          {emptyRows > 0 && (
                            <StyledTableRow
                              style={{
                                height: 53 * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </StyledTableRow>
                          )}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <TablePagination
                    labelRowsPerPage=""
                    labelDisplayedRows={({ from, to, count }) => `${(page + 1)} de ${totalPages} páginas`}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </Grid>              
            </Grid>
            )}
          </Grid>
        {openDialog.users && (
          <DialogUsers
            openDialog={openDialog.users}
            handleVisibilityDialog={handleVisibilityDialog}      
            data={data}
            setSearch={setSearch}
            setData={setData}
            setChange={setChange}
          />
        )}
        {openDialog.branches && (
          <DialogBranches
            openDialog={openDialog.branches}
            handleVisibilityDialog={handleVisibilityDialog}    
            data={data}     
            setSearch={setSearch}
            setData={setData}    
            setChange={setChange}
          />
        )}
        {openDialog.boxes && (
          <DialogBoxes
            openDialog={openDialog.boxes}
            handleVisibilityDialog={handleVisibilityDialog}       
            data={data}  
            setSearch={setSearch}
            setData={setData}  
            setChange={setChange}  
          />
        )}
        {openDialog.payment && (
          <DialogCode
            openDialog={openDialog.payment}
            handleVisibilityDialog={handleVisibilityDialog}       
            data={data}  
            setSearch={setSearch}
            setData={setData}  
            setChange={setChange}  
          />
        )}
        {openDialog.email && (
          <DialogEmail
            openDialog={openDialog.email}
            handleVisibilityDialog={handleVisibilityDialog}       
            data={data}  
            setSearch={setSearch}
            setData={setData} 
            setChange={setChange}   
          />
        )}
      </Grid>
    </>  
  );
}
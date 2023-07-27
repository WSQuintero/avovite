import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { vites } from '../utilities/myCards';
import { useNavigate } from 'react-router-dom';
import { useFinalContext } from '../Context/FinalContext';

function TableGanaciaList() {
  const Navigate = useNavigate()
  const {setTotalGananciaId} = useFinalContext()

  const columnasVisibles = [
    "Numero de Vite",
    "Valor de venta",
    
    "Fecha de venta",
    "Vite de recolección",
    "Polisa de seguro",
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(prevSelectedRow => (prevSelectedRow === id ? null : id));
    setTotalGananciaId(id)
  };

  return (
    <Box sx={(theme) => ({
        display:'none',
      [theme.breakpoints.up('lg')]: {
        bgcolor:'white',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 25,
        width: '100vw',
        marginLeft:-1,
        paddingX:25,
        gap:5
      },
    })}>
         <Grid sx={(t)=>({
          display:'none',
          [t.breakpoints.up('lg')]:{
            display:'flex',
            alignItems:'center',
            gap:1,
            marginRight:100,
          }
        })}>
        <Box
             bgcolor='primary.main'
             borderRadius='50%'
             display='flex'
             justifyContent='center'
             alignItems='center'
             sx={{
                width:60,
                height:60
             }}
            >
                <img src={logoInformacion} width='65%' height='65%' alt="logo"/>
            </Box>
            <Typography variant="h2" width={20} fontSize={24} >Tu Dinero</Typography>

        </Grid>
      <TableContainer elevation={0} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell></TableCell>
              {columnasVisibles.map((columna, index) => (
                <TableCell
                  key={index}
                  sx={{ color: 'white', textAlign: 'center', fontSize:12, }}
                >
                  {columna}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vites.map((fila) => (
              <TableRow
                key={fila.id}
                sx={{
                  backgroundColor: selectedRow === fila.id ? '#EEEEEE' : '',
                  cursor: 'pointer',
                }}
                onClick={() => handleRowClick(fila.id)}
              >
                <TableCell>
                <Box
             bgcolor='primary.main'
             borderRadius='50%'
             display='flex'
             justifyContent='center'
             alignItems='center'
             sx={{
                width:40,
                height:40
             }}
            >
                <img src={logoInformacion} width='60%' height='60%' alt="logo"/>
            </Box>

                </TableCell>
                <TableCell>Vite {fila.numeral}</TableCell>
                <TableCell>$ 5.000.000</TableCell>
                <TableCell>{fila.siembra} </TableCell>
                <TableCell>{fila.dateAlistamiento}</TableCell>
                <TableCell>-$ 1.500.000</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableGanaciaList;





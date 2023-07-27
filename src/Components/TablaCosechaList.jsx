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

function TablaCosechaList() {
  const Navigate = useNavigate()

  const columnasVisibles = [
    "Numero de Vite",
    "Cosecha General",
    
    "Cantidad de Producción",
    "Fecha de Sembrado",
    "Fecha de la ultima Cosecha",
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(prevSelectedRow => (prevSelectedRow === id ? null : id));
    // Navigate(`vite/${id}`)
  };

  return (
    <Box sx={(theme) => ({
      [theme.breakpoints.up('lg')]: {
        bgcolor:'white',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 30,
        width: '100vw',
        marginLeft:4,
        paddingX:29,
        gap:5
      },
    })}>
         <Grid sx={(t)=>({
          display:'none',
          [t.breakpoints.up('lg')]:{
            display:'flex',
            alignItems:'center',
            gap:1,
            marginRight:113,
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
            <Typography variant="h2">Cosechas</Typography>

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
                <TableCell>{fila.cosechaGeneral} kg</TableCell>
                <TableCell>{fila.Cantidad} Toneladas</TableCell>
                <TableCell>{fila.id}</TableCell>
                <TableCell>{fila.dateAlistamiento}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TablaCosechaList;



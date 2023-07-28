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
  Typography,
  InputAdornment,
} from '@mui/material';
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { vites } from '../utilities/myCards';
import { useNavigate } from 'react-router-dom';
import { transacciones } from "../utilities/myCards";
import bomb from "../assets/img/Sidebar/Bomb.svg";

function BancInformation() {
  const Navigate = useNavigate()

  const columnasVisibles = [
    "Tipo de Transacción",
    "Valor",
    "Cantidad",
    "Fecha de Transacción",
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(prevSelectedRow => (prevSelectedRow === id ? null : id));
   
  };

  return (
    <Box sx={(theme) => ({
      display:'none',
      [theme.breakpoints.up('lg')]: {
        display:'flex',
        flexDirection:'column',
        gap:2,
        marginTop: 10,
        width: '75vw',
        marginRight: 10,
      },
    })}>
      <Typography variant='h3'>Buscar</Typography>
      <TextField
              fullWidth
              sx={{ bgcolor: "transparent" }}
              placeholder="Type to search"
              InputProps={{
                style: {
                  color: "black",
                  height: "40px",
                  width: "80%",
                  fontSize: 15,
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: "none",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={bomb} alt="bomb" />
                  </InputAdornment>
                ),
              }}
            />
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
            {transacciones.map((fila) => (
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
                <TableCell>{fila.name}</TableCell>
                <TableCell>{fila.valor}</TableCell>
                <TableCell>{fila.cantidad}</TableCell>
                <TableCell>{fila.date}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BancInformation;

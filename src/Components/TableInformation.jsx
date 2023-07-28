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
} from '@mui/material';
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'
import { vites } from '../utilities/myCards';
import { useNavigate } from 'react-router-dom';

function TableInformation() {
  const Navigate = useNavigate()

  const columnasVisibles = [
    "Numero de Vite",
    "Estado",
    "Fecha de Sembrado",
    "Número Documento Beneficiario",
    "Vite en Alistamiento",
    "Descarga de Certificado",
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(prevSelectedRow => (prevSelectedRow === id ? null : id));
    Navigate(`vite/${id}`)
  };

  return (
    <Box sx={(theme) => ({
      display:'none',
      [theme.breakpoints.up('lg')]: {
        display:'flex',
        marginTop: 10,
        width: '75vw',
        marginRight: 10,
      },
    })}>
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
                <TableCell>{fila.numeral}</TableCell>
                <TableCell>{fila.estado}</TableCell>
                <TableCell>{fila.siembra}</TableCell>
                <TableCell>{fila.id}</TableCell>
                <TableCell>{fila.statusAlistamiento}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{color:'#FFFFFF'}} onClick={() => handleOpenModal(fila.id)}>
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableInformation;

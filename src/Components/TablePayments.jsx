import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';

const TablePayments = ({ data, status, handlePlayment, p }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
            <TableCell>Estado de Pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.values(data).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
            <TableCell>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="warning"
                    disabled={status === 1}
                    onClick={() => handlePlayment(p)}
                  >
                    {status === 0 ? "Pagar" : "Pagado"}
                    {status === 0 && (
                      <img src="https://www.drupal.org/files/project-images/ePayco-logo.png" alt="" width="50" />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePayments;

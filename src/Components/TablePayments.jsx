import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from "@mui/material";

const TablePayments = ({ data, status, handlePlayment, p }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            {Object.values(data).map((value, index) => (
              <TableCell key={index} sx={{ width: "21%", border: "1px solid rgba(128, 128, 128, 0.5)" }}>
                {value}
              </TableCell>
            ))}
            <TableCell sx={{ width: "21%", border: "1px solid rgba(128, 128, 128, 0.5)" }}>
              {" "}
              {/* Aquí establecemos el ancho de la última columna */}
              <Grid container justifyContent="center">
                <Grid item>
                  <Button variant="outlined" color="warning" disabled={status === 1} onClick={() => handlePlayment(p)}>
                    {status === 0 ? "Pagar" : "Pagado"}
                    {status === 0 && <img src="https://www.drupal.org/files/project-images/ePayco-logo.png" alt="" width="50" />}
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

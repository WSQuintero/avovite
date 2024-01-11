import { useMemo, useState } from "react";
import { getComparator, stableSort } from "../utilities/table";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableRow from "./EnhancedTableRow";

function EnhancedTable({ headCells, rows, initialOrder = "asc", initialOrderBy = "", footer = <></>, collapse = null, loading = false }) {
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy || headCells[0]?.id || "");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <>
      <TableContainer sx={{ width: "100%" }}>
        <Table size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          {loading ? (
            <TableRow tabIndex={-1} hover>
              {headCells.map((headCell, index) => (
                <TableCell key={index} align={headCell.align} style={{ width: headCell.width }}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          ) : visibleRows.length ? (
            <TableBody>
              {visibleRows.map((row) => (
                <EnhancedTableRow key={row.id} headCells={headCells} row={row} collapse={collapse} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12}>
                  <Typography fontWeight={500} textAlign="center" padding={2}>
                    No hay datos para mostrar
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Grid display="flex" alignItems="center" paddingLeft={2}>
        {footer}
        <Box flexGrow={1} />
        <TablePagination
          labelRowsPerPage="Filas por pagina"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  );
}

export default EnhancedTable;

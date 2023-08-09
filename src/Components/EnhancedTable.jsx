import { useMemo, useState } from "react";
import { getComparator, stableSort } from "../utilities/table";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";

function EnhancedTable({ title, headCells, rows, footer = <></> }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(headCells[0]?.id || "");
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.name} tabIndex={-1} hover>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align={headCell.align} style={{ width: headCell.width }}>
                    {headCell.format(row[headCell.id], row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={headCells.length} />
              </TableRow>
            )}
          </TableBody>
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
    </Box>
  );
}

export default EnhancedTable;

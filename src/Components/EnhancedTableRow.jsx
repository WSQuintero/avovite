import { Box, Collapse, Table, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";

function EnhancedTableRow({ headCells, row, collapse = null }) {
  const [open, setOpen] = useState(false);

  const onCollapse = () => setOpen((prev) => !prev);

  return (
    <>
      <TableRow tabIndex={-1} hover>
        {headCells.map((headCell, index) => (
          <TableCell key={index} align={headCell.align} style={{ width: headCell.width }}>
            {headCell.format ? headCell.format(row[headCell.id], row, onCollapse) : row[headCell.id]}
          </TableCell>
        ))}
      </TableRow>
      {collapse && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {collapse(row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default EnhancedTableRow;

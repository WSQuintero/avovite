import { Box, Collapse, Table, TableCell, TableRow, Typography, alpha } from "@mui/material";
import React, { useState } from "react";

function EnhancedTableRow({ headCells, row, collapse = null }) {
  const [open, setOpen] = useState(false);

  const onCollapse = () => setOpen((prev) => !prev);

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ bgcolor: (theme) => (open ? alpha(theme.palette.primary.main, 0.1) : "transparent") }}>
        {headCells.map((headCell, index) => (
          <TableCell key={index} align={headCell.align} style={{ width: headCell.width }}>
            {headCell.format ? headCell.format(row[headCell.id], row, onCollapse) : row[headCell.id]}
          </TableCell>
        ))}
      </TableRow>
      {collapse && (
        <TableRow>
          <TableCell sx={{ borderColor: open ? "divider" : "transparent" }} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
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

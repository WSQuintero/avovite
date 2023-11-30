import React from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

function Table({ columns, data = [], isLoading = false, renderDetails, renderBottomBar }) {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      // enableRowActions
      muiTablePaperProps={{ elevation: 0 }}
      initialState={{ density: "compact" }}
      muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
      state={{ showSkeletons: isLoading }}
      localization={MRT_Localization_ES}
      renderDetailPanel={renderDetails && (({ row: { original: row } }) => renderDetails(row))}
      renderBottomToolbarCustomActions={renderBottomBar && (() => renderBottomBar())}
    />
  );
}

export default Table;

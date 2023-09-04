import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { ExportToCsv } from "export-to-csv";
import { Box, Button } from "@mui/material";
import { FileDownload as DownloadIcon } from "@mui/icons-material";
import useUser from "../../Hooks/useUser";
import useSession from "../../Hooks/useSession";

const columns = [
  {
    accessorKey: "fullname",
    id: "fullname",
    header: "Nombre completo",
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Correo",
  },
];

const csvExporter = new ExportToCsv({
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
});

function Users() {
  const [{ token }] = useSession();
  const $User = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExportData = () => {
    csvExporter.generateCsv(users);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const { status, data } = await $User.get();

        if (status) {
          setUsers(data.data);
          setLoading(false);
        }
      })();
    }
  }, [token]);

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableColumnFilterModes
        enableColumnOrdering
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        state={{ showSkeletons: loading }}
        renderBottomToolbarCustomActions={({ table }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="text" color="primary" onClick={handleExportData} startIcon={<DownloadIcon />}>
              Exportar a csv
            </Button>
          </Box>
        )}
      />
    </>
  );
}

export default Users;

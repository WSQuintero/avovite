import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import { FileDownload as DownloadIcon } from "@mui/icons-material";
import useUser from "../../Hooks/useUser";
import useSession from "../../Hooks/useSession";
import { exportWorksheet } from "../../utilities";

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

function Users() {
  const [{ token }] = useSession();
  const $User = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExportData = () => {
    exportWorksheet(users, "users.xlsx");
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

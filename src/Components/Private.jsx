import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const routesToExclude = new Set(["/signin", "/signup", "/", "/form"]);

function Private({ children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Verificar si la ruta actual debe excluirse
  if (routesToExclude.has(pathname)) {
    return <>{children}</>;
  }

  // Renderizar la barra lateral y el contenido
  return (
    <Grid container>
      <Grid item>
        <Sidebar setOpen={setOpen} open={open} />
      </Grid>
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  );
}

export default Private;

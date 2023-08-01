import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";

const routesToExclude = new Set(["/signin", "/signup", "/", "/book-now"]);

function Private({ children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Verificar si la ruta actual debe excluirse
  if (routesToExclude.has(pathname)) {
    return <>{children}</>;
  }

  // Renderizar la barra lateral y el contenido
  return (
    <Grid display="flex">
      <Grid
        sx={(t) => ({
          width: 240,
          [t.breakpoints.down("lg")]: {
            width: "0",
          },
        })}
      >
        <Sidebar setOpen={setOpen} open={open} />
      </Grid>
      <Grid
        sx={(t) => ({
          width: "calc(100vw - 240px)",
          [t.breakpoints.down("lg")]: {
            width: "100vw",
          },
        })}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default Private;

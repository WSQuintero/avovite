import { useMemo } from "react";
import PageWrapper from "../Components/PageWrapper";

import { Container } from "@mui/material";
import EnhancedTable from "../Components/EnhancedTable";

function Earnings() {
  const earningsHeadCells = useMemo(
    () => [
      {
        id: "",
        label: "Contrato",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "",
        label: "Número de vites",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "",
        label: "Rentabilidad (%)",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "",
        label: "valor de rentabilidad",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
    ],
    []
  );

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <EnhancedTable headCells={earningsHeadCells} rows={[]} />
      </Container>
    </PageWrapper>
  );
}

export default Earnings;

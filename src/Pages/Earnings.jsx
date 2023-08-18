import { useEffect, useMemo, useState } from "react";
import { Button, Container } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import EnhancedTable from "../Components/EnhancedTable";
import useUser from "../Hooks/useUser";
import { formatCurrency } from "../utilities";

function Earnings() {
  const $User = useUser();
  const [earnings, setEarnings] = useState([]);

  const earningsHeadCells = useMemo(
    () => [
      {
        id: "id_contract",
        label: "Contrato",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Button
            variant="text"
            size="small"
            onClick={() => window.open(`${$User.API_URL}/contracts/files/${value}`, "_blank")}
          >
            Ver
          </Button>
        ),
      },
      {
        id: "total_vites",
        label: "Número de vites",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "product_name",
        label: "Producto",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "percent_profit",
        label: "Rentabilidad (%)",
        align: "left",
        disablePadding: false,
        format: (value) => `${value}%`,
      },
      {
        id: "amount_profit",
        label: "Ganancias",
        align: "left",
        disablePadding: false,
        format: (value) => formatCurrency(value, "$"),
      },
    ],
    []
  );

  const fetchEarnings = async () => {
    const { status, data } = await $User.getProfits();

    if (status) {
      setEarnings(data.data);
    }
  };

  useEffect(() => {
    if ($User) {
      (async () => {
        await fetchEarnings();
      })();
    }
  }, [$User]);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <EnhancedTable headCells={earningsHeadCells} rows={earnings} />
      </Container>
    </PageWrapper>
  );
}

export default Earnings;

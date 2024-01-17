import { Alert, Dialog, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import useAsyncEffect from "../../Hooks/useAsyncEffect";
import useSession from "../../Hooks/useSession";
import ContractService from "../../Services/contract.service";
import { formatCurrency } from "../../utilities";
import dayjs from "dayjs";
import useConfig from "../../Hooks/useConfig";

function ContractDetail({ open, contractId = null, onClose }) {
  const [{ token }] = useSession();
  const [{ constants }] = useConfig();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);

  useAsyncEffect(async () => {
    if (contractId) {
      setLoading(true);

      const { status, data } = await $Contract.get({ id: contractId });

      if (status) {
        setContract(data.data[0]);
      }

      setLoading(false);
    }
  }, [contractId]);

  if (!open) {
    return <></>;
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Detalles del contrato AV-{contractId}</DialogTitle>
      <DialogContent>
        {loading || !contract ? (
          <LinearProgress />
        ) : (
          <Stack display="flex" flexDirection="column" gap={1}>
            {contract.status_contracts === 0 && <Alert severity="error">El contrato no ha sido creado aún.</Alert>}
            <Typography variant="h4" mt={4}>
              Información financiera
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Financiado:{" "}
              </Typography>
              {contract.financed ? "Si" : "No"}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Descuento:{" "}
              </Typography>
              {contract.percentage_discount}%
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Valor descontado:{" "}
              </Typography>
              ${formatCurrency(contract.contract_discount)}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Total con descuento:{" "}
              </Typography>
              ${formatCurrency(contract.total_contract_with_discount)}
            </Typography>

            <Typography variant="h4" mt={4}>
              Información de primer pago
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Valor:{" "}
              </Typography>
              ${formatCurrency(contract.first_payment)}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Fecha:{" "}
              </Typography>
              {contract.first_payment ? dayjs(contract.first_payment_date).format("DD MMMM YYYY") : "-"}
            </Typography>

            <Typography variant="h4" mt={4}>
              Información del titular
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Teléfono:{" "}
              </Typography>
              {contract.cellphone}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Correo:{" "}
              </Typography>
              {contract.email}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Número de documento:{" "}
              </Typography>
              {contract.id_number}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Número de cuenta:{" "}
              </Typography>
              {contract.user_bank_account_number}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Tipo de cuenta:{" "}
              </Typography>
              {constants?.account_type?.find((a) => String(a.id) === String(contract.user_bank_account_type))?.name}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight={600}>
                Banco:{" "}
              </Typography>
              {constants?.banks?.find((a) => String(a.id) === String(contract.user_id_bank))?.name}
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ContractDetail;

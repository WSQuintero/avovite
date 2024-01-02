import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import $Callback from "../Services/callback.service";
import { Button, Stack, Typography } from "@mui/material";

function Callback() {
  const navigate = useNavigate();
  const { section } = useParams();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState("loading");
  const [messages, setMessages] = useState({ loading: "", success: "", error: "" });

  const loadAction = async () => {
    setStep("loading");

    if (section === "contract") {
      const action = searchParams.get("action");
      const id = searchParams.get("id");
      const token = searchParams.get("token");

      setMessages({
        loading: "Eliminando contrato...",
        success: "Contrato eliminado correctamente",
        error: "Error al eliminar el contrato",
      });

      if (action === "delete-approved") {
        const { status } = await $Callback.contract.delete({ id, token });

        if (status) {
          setStep("success");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setStep("error");
        }
      }
    }
  };

  useEffect(() => {
    loadAction();
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2} minHeight="100vh">
      <Typography fontSize={24}>{messages[step]}</Typography>
      {step === "error" && (
        <Button variant="contained" onClick={loadAction}>
          Intentar de nuevo
        </Button>
      )}
    </Stack>
  );
}

export default Callback;

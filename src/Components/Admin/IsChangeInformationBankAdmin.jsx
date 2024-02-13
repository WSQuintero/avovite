import React, { useEffect, useMemo, useState } from "react";
import { Grid, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import ContractService from "../../Services/contract.service";
import useSession from "../../Hooks/useSession";
import { useNavigate } from "react-router-dom";
import BankAccountTypeSelect from "./BankAccountTypeSelect";
import BancoSelect from "./BancoSelect";


const banks = {
  1: "Banco de Bogotá",
  2: "Banco BBVA",
  3: "Banco Davivienda",
  4: "Banco de Occidente",
  5: "Bancolombia",
  6: "Banco AV Villas",
  7: "Banco Caja Social",
  8: "Banco Falabella",
  9: "Ban100",
  10: "Banco Popular",
  11: "Bancoomeva",
  12: "Bank of America",
  13: "Daviplata",
  14: "Itau",
  15: "Lulo Bank",
  16: "Nequi",
  17: "Pibank",
  18: "Produbanco",
  19: "Scotiabank Colpatria",
  20: "RappiPay",
};

const accountTypes = {
  1: "Cuenta de Ahorros",
  2: "Cuenta Corriente",
  3: "Cuenta de Nómina",
  4: "Cuenta de Depósito a Término (CDT)",
  5: "Cuenta de Ahorro Programado",
  6: "Cuenta de Crédito",
  7: "Cheking account"
};

function IsChangeInformationBankAdmin({ isChangeInformationBank, handleInputChange, informationContract }) {
  const session = useSession();
  const $Contract = useMemo(() => new ContractService(session[0].token), [session[0].token]);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [nameBank, setNameBank] = useState("");
  const [userBankAccountType, setUserBankAccountType] = useState("");
  const [userIdBank, setUserIdBank] = useState("");
  const [userBankAccountNumber, setUserBankAccountNumber] = useState("");


  useEffect(() => {
    if (isChangeInformationBank && informationContract) {
      setNameBank(informationContract.name_bank || "");
      setUserBankAccountType(informationContract.user_bank_account_type_name || "");
      setUserIdBank(informationContract.user_id_bank || "");
      setUserBankAccountNumber(informationContract.user_bank_account_number || "");
    }
  }, [isChangeInformationBank, informationContract]);
  function obtenerClave(object,valueFinal) {
    const keysBanks=Object.entries(object).find(([key, value]) => value === valueFinal)
    return keysBanks ? keysBanks[0] : null; // Retornar la clave si se encuentra o null si no se encuentra
  }

  const handleSubmit = (event) => {
    event.preventDefault();




    const formData = {
      user_bank_account_type: Number(obtenerClave(accountTypes,userBankAccountType)),
      user_id_bank: Number(obtenerClave(banks,nameBank)),
      user_bank_account_number:String(userBankAccountNumber ),
      // user_bank_account_type_name:userBankAccountType,
      // name_bank:nameBank
    };
const updateInformationBank=async()=>{
  const {status}=await $Contract.changeInformationBank({id:informationContract.id_user,body:formData})
  if(status){
    setAlert({show: true, message: "Información bancaria actualizada correctamente", status: "success" });

  }
}
updateInformationBank()
};

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  return (
    <>
      {isChangeInformationBank && (
        <>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1" >Nombre del banco</Typography>
                <BancoSelect setNameBank={setNameBank} nameBank={nameBank} banks={banks}/>              </Grid>
              <Grid item xs={12} sm={12}>
                <BankAccountTypeSelect userBankAccountType={userBankAccountType} setUserBankAccountType={setUserBankAccountType} accountTypes={accountTypes}/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Número de cuenta bancaria</Typography>
                <TextField
                  name="userBankAccountNumber"
                  fullWidth
                  onChange={(e) => setUserBankAccountNumber(e.target.value)}
                  value={userBankAccountNumber}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "20px" }}
                  onClick={() => navigate("/admin/contracts")}
                >
                  Volver
                </Button>
              </Grid>
            </Grid>
          </form>
          <Snackbar open={alert.show} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={resetAlert}>
            <Alert severity={alert.status} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}

export default IsChangeInformationBankAdmin;

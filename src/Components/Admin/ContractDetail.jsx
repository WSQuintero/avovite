import React, { useEffect, useMemo, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams, useSearchParams } from "react-router-dom";
import { FormControl, Grid, Icon, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import useSession from "../../Hooks/useSession";
import ContractService from "../../Services/contract.service";
import IsChangeInformationBeneficiaryAdmin from "./IsChangeInformationBeneficiaryAdmin";
import IsChangeInformationBankAdmin from "./IsChangeInformationBankAdmin";

function ContractDetail() {
  const session = useSession();
  const [isChangeInformationBeneficiary, setIsChangeInformationBeneficiary] = useState(false);
  const [isChangeInformationBank, setIsChangeInformationBank] = useState(false);
  const handleInputChange = (event) => {};
  const id = useParams();
  const [searchParmams] = useSearchParams();
  const [option, setOption] = React.useState("");
  const $Contract = useMemo(() => new ContractService(session[0].token), [session[0].token]);
  const [informationContract, setInformationContract] = useState({});
  const handleChange = (event) => {
    if (event.target.value === "changeBeneficiary") {
      setIsChangeInformationBeneficiary(true);
      setIsChangeInformationBank(false);
    }
    if (event.target.value === "changeBankInfo") {
      setIsChangeInformationBeneficiary(false);
      setIsChangeInformationBank(true);
    }
    setOption(event.target.value);
  };
  useEffect(() => {
    const getContract = async () => {
      const infoContract = await $Contract.getById({ id: Number(id.id) });
      setInformationContract(infoContract.data.data);
    };

    getContract();
  }, []);

  return (
    <PageWrapper collapseSidebar="admin">
      <Stack>
        <Typography fontWeight={600} color="primary.main">
          Contrato {id.id}
        </Typography>
        <div>
          <div>
            <FormControl>
              <Select value={option} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Select an option" }}>
                <MenuItem value="" disabled>
                  Seleccione una opción
                </MenuItem>
                <MenuItem value={"changeBeneficiary"}>Cambiar información de beneficiario</MenuItem>
                <MenuItem value={"changeBankInfo"}>Cambiar información bancaria</MenuItem>
              </Select>
            </FormControl>
          </div>
          <IsChangeInformationBeneficiaryAdmin
            isChangeInformationBeneficiary={isChangeInformationBeneficiary}
            handleInputChange={handleInputChange}
            informationContract={informationContract[0]}
          />

          <IsChangeInformationBankAdmin isChangeInformationBank={isChangeInformationBank} informationContract={informationContract[0]} />



        </div>

      </Stack>
    </PageWrapper>
  );
}

export default ContractDetail;

import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams, useSearchParams } from "react-router-dom";
import { Icon, IconButton, Stack, Typography } from "@mui/material";

function ContractDetail() {
  const { id } = useParams();
  const [searchParmams] = useSearchParams();

  return (
    <PageWrapper collapseSidebar="admin">
      <Stack>
        <Typography fontWeight={600} color="primary.main">
          Contrato {id}
        </Typography>
      </Stack>
    </PageWrapper>
  );
}

export default ContractDetail;

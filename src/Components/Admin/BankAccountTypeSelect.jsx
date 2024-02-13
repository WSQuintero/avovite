import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function BankAccountTypeSelect({ informationContract, userBankAccountType, setUserBankAccountType, accountTypes }) {

  useEffect(() => {
    if (informationContract && informationContract.user_bank_account_type_name) {
      setUserBankAccountType(informationContract.user_bank_account_type_name);
    }
  }, [informationContract]);

  const handleChange = (event) => {
    setUserBankAccountType(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="bank-account-type-label">Tipo de Cuenta Bancaria</InputLabel>
      <Select
        labelId="bank-account-type-label"
        id="bank-account-type-select"
        value={userBankAccountType}
        label="Tipo de Cuenta Bancaria"
        onChange={handleChange}
      >
        {Object.entries(accountTypes).map(([key, value]) => (
          <MenuItem key={key} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default BankAccountTypeSelect;

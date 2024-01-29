import { useEffect, useState } from "react";
import useSession from "./useSession";

function useLastContract() {
  const [{ user }] = useSession();
  const [data, setData] = useState({});

  useEffect(() => {
    if (user && user.last_contract) {
      const contract = user.last_contract;

      setData({
        fullname: contract.fullname || "",
        id_type: contract.id_type || "-",
        id_number: contract.id_number || "",
        id_location_expedition: contract.id_location_expedition || "",
        birthdate: contract.birthdate || "",
        email: contract.email || "",
        cellphone: contract.cellphone || "",
        nationality: contract.nationality || "",
        country_of_residence: contract.country_of_residence || "-",
        cod_municipio: contract.cod_municipio || "-",
        residence_neighborhood: contract.residence_neighborhood || "",
        address_residence: contract.address_residence || "",
        civil_status: contract.civil_status || "-",
        education_level: contract.education_level || "-",
        he_has_children: contract.he_has_children === true ? "Yes" : "No",
        he_has_children_count: contract.he_has_children_count || "1",
        occupation: contract.occupation || "-",
        profession: contract.profession || "",
        economy_activity: contract.economy_activity || "",
        monthly_income: contract.monthly_income || "",
        how_did_you_hear_about_us: contract.how_did_you_hear_about_us || "-",

        user_id_bank: contract.user_id_bank || "-",
        user_bank_account_type: contract.user_bank_account_type || "-",
        user_bank_account_number: contract.user_bank_account_number || "",
        does_account_belong_to_holder: contract.does_account_belong_to_holder === true ? "No" : "Yes",
        full_name_of_account_holder: contract.full_name_of_account_holder || "",
        account_holder_document_type: contract.account_holder_document_type || "-",
        document_number_of_the_account_holder: contract.document_number_of_the_account_holder || "",

        beneficiary_fullname: contract.beneficiary_fullname || "",
        email_beneficiary: contract.email_beneficiary || "",
        beneficiary_id_number: contract.beneficiary_id_number || "",
        beneficiary_id_type: contract.beneficiary_id_type || "-",
        cellphone_beneficiary: contract.cellphone_beneficiary || "",
        beneficiary_id_location_expedition: contract.beneficiary_id_location_expedition || "",
        country_of_residence_beneficiary: contract.country_of_residence_beneficiary || "-",
        cod_municipio_beneficiary: contract.cod_municipio_beneficiary || "-",
        address_residence_beneficiary: contract.address_residence_beneficiary || "",
        civil_status_beneficiary: contract.civil_status_beneficiary || "-",
        economy_activity_beneficiary: contract.economy_activity_beneficiary || "",
      });
    }
  }, [user]);

  return data;
}

export default useLastContract;

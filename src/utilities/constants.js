export const IMAGE_PLACEHOLDER = "https://cutewallpaper.org/24/image-placeholder-png/emoji.png";

const domain = window.location.hostname;

export const TESTING_EPAYCO = domain === "appdev.avovite.com" || domain === "localhost";

export const DOCUMENT_TYPES = {
  cedula: "Cédula de Ciudadanía",
  cedulaExtranjeria: "Cédula de Extranjería",
  pasaporte: "Pasaporte",
  dni: "DNI",
  nit: "NIT",
};

export const CIVIL_STATUS = {
  "Soltero(a)": "Soltero(a)",
  "Casado(a)": "Casado(a)",
  "Separado(a)": "Separado(a)",
  "Divorciado(a)  ": "Divorciado(a) ",
  "Viudo(a)": "Viudo(a)",
};

export const OCCUPATION = {
  "Empleado(a)": "Empleado(a)",
  "Desempleado(a)": "Desempleado(a)",
  "Empresario(a)": "Empresario(a)",
  "Pensionado(a)": "Pensionado(a)",
  "Jubilado(a)": "Jubilado(a)",
  "Autoempleado(a)/Emprendedor(a)": "Autoempleado(a)/Emprendedor(a)",
};

export const EDUCATIONAL_LEVEL = {
  Primaria: "Primaria",
  Bachiller: "Bachiller",
  Técnico: "Técnico",
  Tecnólogo: "Tecnólogo",
  Profesional: "Profesional",
  Especialización: "Especialización",
  Maestría: "Maestría",
  Doctorado: "Doctorado",
};

export const HOW_DID_YOU_HEAR_ABOUT_US = {
  "facebook-instagram-ad": "Anuncio Facebook / Instagram",
  "youtube-ad": "Anuncio YouTube",
  referral: "Referido",
  influencer: "Influencer - Youtuber",
};

export const CONTRACT_TYPES = {
  mortgage: "Con Hipoteca",
  standard: "Sin Hipoteca",
};

export const DEV_FORMS = [
  {
    fullname: "May Kap",
    id_type: "cedula",
    id_number: "AT374743",
    id_location_expedition: "Atlantis",
    birthdate: "1993-01-21T04:00:00.000Z",
    email: "maykap@yopmail.com",
    cellphone: "573000000001",
    nationality: "063",
    country_of_residence: "063",
    cod_municipio: "Buenos Aires",
    residence_neighborhood: "Sample",
    address_residence: "Sample",
    civil_status: "Soltero(a)",
    education_level: "Profesional",
    he_has_children: "No",
    he_has_children_count: "1",
    occupation: "Pensionado(a)",
    profession: "Sample",
    economy_activity: "Sample",
    monthly_income: "10,000,000",
    how_did_you_hear_about_us: "Anuncio Facebook / Instagram",
    user_id_bank: 1,
    user_bank_account_type: 1,
    user_bank_account_number: "2423423434",
    does_account_belong_to_holder: "Yes",
    full_name_of_account_holder: "",
    account_holder_document_type: "-",
    document_number_of_the_account_holder: "",
    beneficiary_fullname: "Alaska Nebraska",
    email_beneficiary: "alaska@yopmail.com",
    beneficiary_id_number: "Sample",
    beneficiary_id_type: "cedula",
    cellphone_beneficiary: "573000000002",
    beneficiary_id_location_expedition: "New York",
    country_of_residence_beneficiary: "249",
    cod_municipio_beneficiary: "Sample",
    address_residence_beneficiary: "Sample",
    civil_status_beneficiary: "Separado(a)",
    economy_activity_beneficiary: "Empresario",
  },
];

export const VERIFIK_DOCUMENTS = {
  CC: {
    for: [
      "disciplinary-records-procuraduria",
      "police-background-check",
      "police-enforcement-corrective-measures",
      "international-criminal-records",
    ],
    label: "Cedula de Ciudadanía",
  },
  CE: {
    for: [
      "disciplinary-records-procuraduria",
      "police-background-check",
      "police-enforcement-corrective-measures",
      "international-criminal-records",
    ],
    label: "Cedula de Extranjería",
  },
  PEP: {
    for: ["disciplinary-records-procuraduria", "international-criminal-records"],
    label: "Pasaporte",
  },
  PA: {
    for: ["international-criminal-records"],
    label: "Permiso de Asistencia",
  },
  RC: {
    for: ["international-criminal-records"],
    label: "Registro Civil",
  },
  CCVE: {
    for: ["international-criminal-records"],
    label: "Cuenta Corriente Virtual",
  },
  NIT: {
    for: ["international-criminal-records"],
    label: "NIT",
  },
  CURP: {
    for: ["international-criminal-records"],
    label: "CURP",
  },
  DNI: {
    for: ["international-criminal-records"],
    label: "DNI",
  },
  CCEC: {
    for: ["international-criminal-records"],
    label: "Cuenta Corriente Electroconmutador",
  },
};

export const VERIFIK_INTERNATIONAL = {
  // dea: "DEA",
  interpol: "Interpol",
};

export const TRANSACTION_TYPES = {
  pay: "Pago",
  revenue: "Ganancia",
  withdrawal: "Retiro",
};

import { TESTING_EPAYCO } from "../utilities/constants";

export default {
  async pay({
    name,
    description,
    invoice,
    amount,
    extra1,
    extra2,
    extra3,
    extra4,
    extra5,
    confirmationUrl,
    redirectionUrl,
    tax_base = "4000",
    tax = "500",
    tax_ico = "500",
  }) {
    const mandatory = {
      name,
      description,
      invoice,
      amount,
      tax_base,
      tax,
      tax_ico,
      currency: "cop",
      country: "co",
      lang: "es",
    };

    const aditional = {
      extra1,
      extra2,
      extra3,
      extra4,
      extra5,
      confirmation: `${import.meta.env.VITE_API_URL}/${confirmationUrl}`,
      response: `${import.meta.env.VITE_APP_URL}/${redirectionUrl}`,
    };

    const handler = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: TESTING_EPAYCO,
    });

    handler.open({ ...mandatory, ...aditional, ...{ acepted: `${import.meta.VITE_APP_URL}`, rejected: `${import.meta.VITE_APP_URL}` } });
  },
};

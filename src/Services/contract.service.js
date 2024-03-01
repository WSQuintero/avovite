import axios from "axios";
import { handleCall } from "../utilities";

export default class ContractService {
  constructor(token) {
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null, dateRangeId = null, pending = false, pendingToPay = false, harvest = false } = {}) {
    return await handleCall(async () => {
      if (pendingToPay) {
        return (await axios.get(`${this.API_URL}/contract-transactional-payments/pending-to-pay`, this.config)).data;
      } else if (pending) {
        return (await axios.get(`${this.API_URL}/contract-transactional-payments/pending`, this.config)).data;
      } else if (dateRangeId) {
        return (await axios.get(`${this.API_URL}/contract-date-range-profit/split/contracts/${dateRangeId}`, this.config)).data;
      } else if (harvest) {
        return (await axios.get(`${this.API_URL}/contracts/harvest`, this.config)).data;
      } else if (id) {
        return (await axios.get(`${this.API_URL}/contracts/${id}`, this.config)).data;
      } else {
        return (await axios.get(`${this.API_URL}/contracts`, this.config)).data;
      }
    });
  }

  async getById({ id = null }) {
    return await handleCall(async () => {
      if (id) {
        return (await axios.get(`${this.API_URL}/contracts/${id}`, this.config)).data;
      }
    });
  }
  async exportByDate({ initDate, finalDate }) {
    return await handleCall(async () => {
      if (initDate && finalDate) {
        // Corrección en la condición
        try {
          const response = await axios.get(`${this.API_URL}/contracts/export/xlsx/?dateat=${initDate}&dateend=${finalDate}`, {
            responseType: "blob",
            headers: { Authorization: this.token }, // Agregar el token a las cabeceras
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `archivo.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error al descargar el archivo:", error);
        }
      }
    });
  }

  async add({ body, mortgage = false } = {}) {
    return await handleCall(
      async () =>
        (mortgage
          ? await axios.post(`${this.API_URL}/contracts/mortgage`, body, this.config)
          : await axios.post(`${this.API_URL}/contracts`, body, this.config)
        ).data
    );
  }

  async complete({ id, body, mortgage = false, pending = false } = {}) {
    return await handleCall(
      async () =>
        (pending
          ? await axios.put(`${this.API_URL}/contract-transactional-payments/complete/${id}`, body, this.config)
          : mortgage
          ? await axios.put(`${this.API_URL}/contracts/complete-contract-mortgage/${id}`, body, this.config)
          : await axios.put(`${this.API_URL}/contracts/completeContract/${id}`, body, this.config)
        ).data
    );
  }

  async delete({ id }) {
    return await handleCall(async () => (await axios.delete(`${this.API_URL}/contracts/${id}`, this.config)).data);
  }

  async requestDelete({ id }) {
    return await handleCall(async () => (await axios.delete(`${this.API_URL}/contracts/request/cancel/contract/${id}`, this.config)).data);
  }

  async export() {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/all/excel`, this.config)).data);
  }

  async sendSignature({ id }) {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/signature/${id}`, this.config)).data);
  }

  async refreshSignatures() {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/update/allstatus/validocus`, this.config)).data);
  }
  async change({ id, body }) {
    return await handleCall(async () => (await axios.put(`${this.API_URL}/contracts/change/update/${id}`, body, this.config)).data);
  }
  async changeInformationBank({ id, body }) {
    return await handleCall(
      async () => (await axios.put(`${this.API_URL}/contracts/change/bankinformation/${id}`, body, this.config)).data
    );
  }
  async sendInvasiveForm(body) {
    return await handleCall(async () => (await axios.post(`${this.API_URL}/customerlinking/`, body, this.config)).data);
  }

  async exportDocumentContract({ id }) {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/files/${id}`, this.config)).data);
  }
  async exportPropietyCertificate({ id }) {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/certificado/depropiedad/${id}`, this.config)).data);
  }
  async exportPayRollSheet({ id }) {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contracts/certificado/planillapagos/${id}`, this.config)).data);
  }
}

import axios from "axios";
import { handleCall } from "../utilities";

export default class ContractService {
  constructor(token) {
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (await axios.get(`${this.API_URL}/contracts/${id}`)).data;
      } else {
        return (await axios.get(`${this.API_URL}/contracts`, this.config)).data;
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

  async complete({ id, body, mortgage = false } = {}) {
    return await handleCall(
      async () =>
        (mortgage
          ? await axios.put(`${this.API_URL}/contracts/complete-contract-mortgage/${id}`, body, this.config)
          : await axios.put(`${this.API_URL}/contracts/completeContract/${id}`, body, this.config)
        ).data
    );
  }
}

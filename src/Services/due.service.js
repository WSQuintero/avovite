import axios from "axios";
import { handleCall } from "../utilities";

export default class DueService {
  constructor(token) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
  }
  async get({ contractId = null } = {}) {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/contract-financed-quotas/${contractId}`, this.config)).data);
  }
  async updateStatus({ id, ...body }) {
    return await handleCall(async () => (await axios.putForm(`${this.API_URL}/contract-financed-quotas/${id}`, body, this.config)).data);
  }
  async updateFirstDue({ contractId, ...body }) {
    return await handleCall(
      async () => (await axios.putForm(`${this.API_URL}/contract-financed-quotas/firstPayment/${contractId}`, body, this.config)).data
    );
  }
}

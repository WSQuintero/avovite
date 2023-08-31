import axios from "axios";
import { handleCall } from "../utilities";

export default class DueService {
  constructor(token) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
  }

  async get({ contractId = null } = {}) {
    return await handleCall(
      async () => (await axios.get(`${this.API_URL}/contract-financed-quotas/${contractId}`, this.config)).data
    );
  }

  async updateStatus({ id, status }) {
    return await handleCall(
      async () => (await axios.put(`${this.API_URL}/contract-financed-quotas/${id}`, { status }, this.config)).data
    );
  }
}

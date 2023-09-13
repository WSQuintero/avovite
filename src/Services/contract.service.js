import axios from "axios";
import { handleCall } from "../utilities";

export default class ContractService {
  constructor(token) {
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null, dateRangeId = null, pending = false, pendingToPay = false } = {}) {
    return await handleCall(async () => {
      if (pendingToPay) {
        return (await axios.get(`${this.API_URL}/contract-transactional-payments/pending-to-pay`, this.config)).data;
      } else if (pending) {
        return (await axios.get(`${this.API_URL}/contract-transactional-payments/pending`, this.config)).data;
      } else if (id) {
        return (await axios.get(`${this.API_URL}/contracts/${id}`, this.config)).data;
      } else if (dateRangeId) {
        return (
          await axios.get(`${this.API_URL}/contract-date-range-profit/split/contracts/${dateRangeId}`, this.config)
        ).data;
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
}

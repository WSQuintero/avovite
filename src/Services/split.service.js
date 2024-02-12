import axios from "axios";
import { handleCall } from "../utilities";

export default class SplitService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });

    this.approved = {
      API_URL: this.API_URL,
      axios: this.axios,
      async get({ id, split_payment_id }) {
        return id
          ? await handleCall(async () => (await this.axios.get(`${this.API_URL}/splitPaymentApproved/${id}`)).data)
          : split_payment_id
          ? await handleCall(
              async () => (await this.axios.get(`${this.API_URL}/splitPaymentApproved/splitpayment/${split_payment_id}`)).data
            )
          : await handleCall(async () => (await this.axios.get(`${this.API_URL}/splitPaymentApproved`)).data);
      },
      async add({ id, ...body } = {}) {
        return await handleCall(async () => (await this.axios.post(`${this.API_URL}/splitPaymentApproved`, body)).data);
      },
      async update({ id, ...body } = {}) {
        return await handleCall(async () => (await this.axios.put(`${this.API_URL}/splitPaymentApproved/${id}`, body)).data);
      },
      async delete({ id }) {
        return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/splitPaymentApproved/${id}`)).data);
      },
    };
  }
  async get({ id = null } = {}) {
    return await handleCall(
      async () =>
        (id ? await this.axios.get(`${this.API_URL}/SplitPayment/${id}`) : await this.axios.get(`${this.API_URL}/SplitPayment`)).data
    );
  }
  async download({ id } = {}) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/SplitPayment/generate-xlsx/${id}`)).data);
  }
  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/SplitPayment`, body)).data);
  }
  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.put(`${this.API_URL}/SplitPayment/${id}`, body)).data);
  }
  async delete({ id }) {
    return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/SplitPayment/${id}`)).data);
  }
  async generate({ id } = {}) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/SplitPayment/generate-split-payment/${id}`)).data);
  }
}

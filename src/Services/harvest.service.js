import axios from "axios";
import { handleCall } from "../utilities";

export default class HarvestService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });

    this.profitability = {
      API_URL: this.API_URL,
      axios: this.axios,
      async get({ id, id_harvest }) {
        return id
          ? await handleCall(async () => (await this.axios.get(`${this.API_URL}/harvest-profitability/${id}`)).data)
          : id_harvest
          ? await handleCall(async () => (await this.axios.get(`${this.API_URL}/harvest-profitability/harvest/${id_harvest}`)).data)
          : await handleCall(async () => (await this.axios.get(`${this.API_URL}/harvest-profitability`)).data);
      },
      async add({ id, ...body } = {}) {
        return await handleCall(async () => (await this.axios.post(`${this.API_URL}/harvest-profitability`, body)).data);
      },
      async update({ id, ...body } = {}) {
        return await handleCall(async () => (await this.axios.put(`${this.API_URL}/harvest-profitability/${id}`, body)).data);
      },
      async delete({ id }) {
        return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/harvest-profitability/${id}`)).data);
      },
    };
  }
  async get({ id = null } = {}) {
    return await handleCall(
      async () => (id ? await this.axios.get(`${this.API_URL}/harvest/${id}`) : await this.axios.get(`${this.API_URL}/harvest`)).data
    );
  }
  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/harvest`, body)).data);
  }
  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.put(`${this.API_URL}/harvest/${id}`, body)).data);
  }
  async delete({ id }) {
    return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/harvest/${id}`)).data);
  }
  async split({ id }) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/harvest/generate-split-harvest/${id}`)).data);
  }
  async import(file) {
    return await handleCall(async () => (await this.axios.postForm(`${this.API_URL}/harvest-profitability/import/xlsx`, { file })).data);
  }
}

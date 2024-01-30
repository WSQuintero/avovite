import axios from "axios";
import { handleCall } from "../utilities";

export default class AuthService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;

    this.config = { headers: { Authorization: this.token } };
  }

  async get({ id = null } = {}) {
    return await handleCall(
      async () =>
        (id ? await axios.get(`${this.API_URL}/users/${id}`, this.config) : await axios.get(`${this.API_URL}/users`, this.config)).data
    );
  }

  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await axios.post(`${this.API_URL}/users`, body, this.config)).data);
  }

  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await axios.put(`${this.API_URL}/users/update/${id}`, body, this.config)).data);
  }

  async updateRole({ id, role } = {}) {
    return await handleCall(async () => (await axios.put(`${this.API_URL}/users/update/rol/${id}`, { rol: role }, this.config)).data);
  }

  async delete({ id }) {
    return await handleCall(async () => (await axios.delete(`${this.API_URL}/users/${id}`, this.config)).data);
  }

  async getProfits() {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/users/profits`, this.config)).data);
  }

  async import({ file }) {
    return await handleCall(async () => (await axios.postForm(`${this.API_URL}/users/importData`, { file }, this.config)).data);
  }

  async sendEmail({ massive, ...body } = {}) {
    return await handleCall(
      async () => (await axios.post(`${this.API_URL}/users/send/mails`, body, { ...this.config, params: { massive } })).data
    );
  }

  async sendSMS({ massive, ...body } = {}) {
    return await handleCall(
      async () => (await axios.post(`${this.API_URL}/users/send/sms`, body, { ...this.config, params: { massive } })).data
    );
  }
}

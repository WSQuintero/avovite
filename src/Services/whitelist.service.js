import axios from "axios";
import { handleCall } from "../utilities";

export default class WHiteListService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;

    this.config = { headers: { Authorization: this.token } };
  }
  async get({ id = null } = {}) {
    return await handleCall(
      async () =>
        (id
          ? await axios.get(`${this.API_URL}/approvedlist/${id}`, this.config)
          : await axios.get(`${this.API_URL}/approvedlist`, this.config)
        ).data
    );
  }
  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await axios.post(`${this.API_URL}/approvedlist`, body, this.config)).data);
  }
  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await axios.put(`${this.API_URL}/approvedlist/${id}`, body, this.config)).data);
  }
  async delete({ id }) {
    return await handleCall(async () => (await axios.delete(`${this.API_URL}/approvedlist/${id}`, this.config)).data);
  }
}

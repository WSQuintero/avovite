import axios from "axios";
import { handleCall } from "../utilities";

export default class ProductionService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }

  async get({ vites }) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/production/${vites}`)).data);
  }
  async import({ file }) {
    return await handleCall(async () => {
      return await this.axios.postForm(`${this.API_URL}/production`, { xslx: file });
    });
  }
}

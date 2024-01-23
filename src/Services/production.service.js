import axios from "axios";
import { handleCall } from "../utilities";

export default class ProductionService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }

  async get(key) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/production/${key}`, { responseType: "arraybuffer" })).data);
  }
  async post(file) {
    let formData = new FormData();
    formData.append("xlsx", file); // Changed from "File" to "xlsx"
    return await handleCall(async () => {
      const response = await this.axios.post(`${this.API_URL}/production`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: this.token,
        },
      });
      return response.data;
    });
  }
}

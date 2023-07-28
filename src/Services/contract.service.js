import axios from "axios";
import { handleCall } from "../utilities";

const API_URL = "https://avovite-api-dev.concilbot.com/api/v1";

export default class ContractService {
  constructor(token) {
    this.token = token;
    this.API_URL = API_URL;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (
          await axios.get(`${this.API_URL}/contracts/${id}`, {
            headers: {
              Authorization: this.token,
            },
          })
        ).data;
      } else {
        return (
          await axios.get(`${this.API_URL}/contracts`, {
            headers: {
              Authorization: this.token,
            },
          })
        ).data;
      }
    });
  }

  async add({ body } = {}) {
    return await handleCall(
      async () =>
        (
          await axios.post(`${this.API_URL}/contracts`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async complete({ id, body } = {}) {
    return await handleCall(
      async () =>
        (
          await axios.put(`${this.API_URL}/contracts/completeContract/${id}`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }
}

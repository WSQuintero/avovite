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
        (id
          ? await axios.get(`${this.API_URL}/users/${id}`, this.config)
          : await axios.get(`${this.API_URL}/users`, this.config)
        ).data
    );
  }

  async getProfits() {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/users/profits`, this.config)).data);
  }
}

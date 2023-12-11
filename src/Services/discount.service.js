import axios from "axios";
import { handleCall } from "../utilities";

export default class DiscountService {
  constructor(token) {
    this.token = token;
    this.API_URL = import.meta.env.VITE_API_URL;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (
          await axios.get(`${this.API_URL}/discountCode/${id}`, {
            headers: {
              Authorization: this.token,
            },
          })
        ).data;
      } else {
        return (
          await axios.get(`${this.API_URL}/discountCode`, {
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
          await axios.post(`${this.API_URL}/discountCode`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async update({ id, body }) {
    return await handleCall(
      async () =>
        (
          await axios.put(`${this.API_URL}/discountCode/${id}`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async delete({ id }) {
    return await handleCall(
      async () =>
        (
          await axios.delete(`${this.API_URL}/discountCode/${id}`, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async validate({ code }) {
    return await handleCall(
      async () =>
        (
          await axios.post(
            `${this.API_URL}/discountCode/validate`,
            { code },
            { headers: { Authorization: this.token } }
          )
        ).data
    );
  }
}

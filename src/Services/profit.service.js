import axios from "axios";
import { handleCall } from "../utilities";

export default class ProfitService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ dateRangeId = null } = {}) {
    return await handleCall(async () => {
      if (dateRangeId) {
        return (
          await axios.get(`${this.API_URL}/contract-date-range-profit/${dateRangeId}`, {
            headers: {
              Authorization: this.token,
            },
          })
        ).data;
      } else {
        return (
          await axios.get(`${this.API_URL}/contract-date-range-profit`, {
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
          await axios.post(`${this.API_URL}/contract-date-range-profit`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async update({ id, body }) {
    return await handleCall(
      async () =>
        (
          await axios.put(`${this.API_URL}/contract-date-range-profit/${id}`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async delete({ id }) {
    return await handleCall(
      async () =>
        (
          await axios.delete(`${this.API_URL}/contract-date-range-profit/${id}`, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async split({ id }) {
    return await handleCall(
      async () =>
        (
          await axios.put(`${this.API_URL}/contract-date-range-profit/split/${id}`, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }
}

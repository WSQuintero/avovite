import axios from "axios";
import { handleCall } from "../utilities";

export default class AuthService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;
  }

  async signin({ email, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/signin`, {
        email,
        password,
      });

      /* const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: "123",
            }),
          200
        )
      ); */

      return { status: true, data: data.data };
    } catch (error) {
      return { status: false, data: "" };
    }
  }

  async signup({ fullname, email, password, cellphone } = {}) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/signup`, {
        fullname,
        email,
        cellphone,
        password,
      });

      return { status: true, data };
    } catch ({ response }) {
      return { status: false, data: response.data };
    }
  }

  async update(body) {
    return await handleCall(
      async () =>
        (
          await axios.put(`${this.API_URL}/users/update/null`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }//aquí se debe poner el endpoint para actualizar los datos

  async updateAvatar(body) {
    return await handleCall(
      async () =>
        (
          await axios.putForm(`${this.API_URL}/users/userAvatar`, body, {
            headers: { Authorization: this.token },
          })
        ).data
    );
  }

  async validate() {
    if (!this.token) {
      return { status: false, data: null };
    }

    try {
      const { data } = await axios.get(`${this.API_URL}/users/session`, {
        headers: {
          Authorization: this.token,
        },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async forgotPassword({ email, token = null, password } = {}) {
    return await handleCall(
      async () =>Auth
        (token
          ? await axios.post(`${this.API_URL}/users/reset-password/with/token`, { password, password2: password }, { params: { token } })
          : await axios.post(`${this.API_URL}/users/reset-password`, { email })
        ).data
    );
  }

  async createPassword({ email, password } = {}) {
    return await handleCall(
      async () => await axios.post(`${this.API_URL}/users/reset-password/with/token`, { password, password2: password }).data
    );
  }
}

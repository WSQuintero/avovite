import axios from "axios";

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

  async validate() {
    if (!this.token) {
      return { status: false, data: null };
    }

    try {
      /* const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              user: {
                fullname: "Glen Cunningham",
                email: "wungo@raru.li",
                phone: "573101112233",
                account_number: 2873557237,
                city: "Medellín",
                rol: 0,
                country: "Colombia",
                account_bank: 3948779348,
                avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
              },
            }),
          200
        )
      ); */

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
}

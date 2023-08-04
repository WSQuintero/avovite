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

      return { status: true, data: data.data };
    } catch (error) {
      return { status: false, data: "" };
    }
  }

  async signup({ fullName, email, password, slug = "" } = {}) {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1] || "";
    const slugInvitation = `${firstName}${parseInt(Math.random() * 100)}`;

    try {
      const { data } = await axios.post(`${this.API_URL}/users/register/${slug}`, {
        email,
        firstName,
        lastName,
        password,
        slugInvitation,
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
      const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              user: {
                name: "Glen Cunningham",
                email: "wungo@raru.li",
                phone: "573101112233",
                account_number: 2873557237,
                city: "Medellín",
                country: "Colombia",
                account_bank: 3948779348,
                avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
              },
            }),
          200
        )
      );

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
}

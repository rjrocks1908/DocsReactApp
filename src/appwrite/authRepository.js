import { conf } from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthRepository {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async registerUser({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user) {
        this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      console.log("Appwrite service :: registerUser :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

export const authRepository = new AuthRepository();

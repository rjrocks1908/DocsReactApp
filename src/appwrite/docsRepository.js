import { conf } from "../conf/conf.js";
import { Client, Databases, Storage, ID } from "appwrite";

class DocsRepository {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createDoc({ title, description, filesize, fileId, cardColor }) {
    try {
      const result = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          description,
          filesize,
          cardColor,
          file: fileId,
        }
      );
      return result;
    } catch (error) {
      console.log("Docs Reporsitory :: createDoc :: error", error);
    }
  }

  async updateDoc(docId, { title, description, filesize, cardColor }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        docId,
        {
          title,
          description,
          filesize,
          cardColor,
        }
      );
    } catch (error) {
      console.log("Docs Reporsitory :: updateDoc :: error", error);
    }
  }

  async deleteDoc(docId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        docId
      );
      return true;
    } catch (error) {
      console.log("Docs Reporsitory :: deleteDoc :: error", error);
      return false;
    }
  }

  async getDocs() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Docs Reporsitory :: getDocs :: error", error);
    }
  }

  async uploadDoc(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Docs Reporsitory :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
  }

  downloadFile(fileId) {
    return this.storage.getFileDownload(conf.appwriteBucketId, fileId);
  }
}

export const docsRepository = new DocsRepository();

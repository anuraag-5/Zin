import { Storage ,Client,  Databases, Avatars, Account } from "appwrite";

export const appwriteConfig = {
    projectId : import.meta.env.VITE_APPWRITE_ID,
    url : import.meta.env.VITE_APPWRITE_URL,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId : import.meta.env.VITE_APPWRITE_DATABASE_USERS,
    potCollectionid : import.meta.env.VITE_APPWRITE_DATABASE_POSTS,
    savesCollectionid : import.meta.env.VITE_APPWRITE_DATABASE_SAVES 
} 

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const account = new Account(client);
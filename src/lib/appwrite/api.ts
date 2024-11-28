import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(newAccount.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveUserToDB = async (user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: string;

}) => {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )

        return newUser
    } catch (error) {
        console.log(error)
    }
};

export const signInAccount = async (user : {
  email : string ,
  password : string
}) => {
  try {
    const session = await account.createEmailPasswordSession(user.email , user.password)
    return session
  } catch (error) {
    console.log(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if(!currentAccount){
      throw new Error
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId",currentAccount.$id)]
    )
    if(!currentUser)throw new Error

    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}
'use server'

import { ID, Query } from "node-appwrite";
import { ENDPOINT, PROJECT_ID, BUCKET_ID,DATABASE_ID,PATIENT_COLLECTION_ID, databases, storage, users,} from "../appwrite.config";
import { parseStringify } from "../utils";
import { IdentificationTypes } from "@/constants";
import {InputFile} from "node-appwrite/file";
import { optional } from "zod";


export const createUser = async (user: CreateUserParams) => {
     try{
        const newUser = await users.create(
            ID.unique(),
            user.email, 
            user.phone, 
            undefined, 
            user.name
        )
        console.log({newUser})

        return newUser;
     } catch(error: any) {
        if(error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents?.users[0];
        }
     }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        
        return parseStringify(user);
    } catch (error) {
        console.log(error); 
    }
}

export const registerPatient = async ({ identificationDocument, userId, ...patient }: RegisterUserParams) => {
    try {
      let file = null;
      let fileUrl = null;
  
      if (identificationDocument) {
        const fileEntry = identificationDocument.get("identificationDocument") as File;
  
        if (fileEntry) {
          const buffer = await fileEntry.arrayBuffer();
          const inputFile = InputFile.fromBuffer(Buffer.from(buffer), fileEntry.name);
  
          file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
  
          if (file?.$id) {
            fileUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
          }
        }
      }
  
      // Build payload safely
      const payload: Record<string, any> = {
        ...patient,
        userid: userId, // ✅ Correctly mapped
        //gender: patient.gender.toLowerCase(),
        ...(file?.$id && { identificationDocumentId: file.$id }),
        ...(fileUrl && { identificationDocumentUrl: fileUrl }),
      };
  
      console.log("📦 Payload to Appwrite:", payload);
  
      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        payload
      );
  
      return parseStringify(newPatient);
  
    } catch (error) {
      console.error("❌ Error in registerPatient:", error);
      throw error;
    }
};

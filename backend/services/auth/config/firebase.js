import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // On Render, we will use an environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Locally, read the ignored json file
  try {
    const fileContent = fs.readFileSync(new URL("../serviceAccount.json", import.meta.url));
    serviceAccount = JSON.parse(fileContent);
  } catch (error) {
    console.warn("⚠️ serviceAccount.json not found");
  }
}

export const app = serviceAccount ? initializeApp({
  credential: cert(serviceAccount),
}) : null;
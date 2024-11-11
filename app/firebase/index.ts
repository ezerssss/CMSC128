import { cert, getApps, initializeApp } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "");

const activeApps = getApps();
const serverApp =
  activeApps.length > 0
    ? activeApps[0]
    : initializeApp({ credential: cert(serviceAccount) });

export default serverApp;

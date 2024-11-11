import serverApp from ".";
import { getFirestore } from "firebase-admin/firestore";

const serverDb = getFirestore(serverApp);

export default serverDb;

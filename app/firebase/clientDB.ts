import { getFirestore } from "firebase/firestore";
import clientApp from "./client";

const clientDb = getFirestore(clientApp);

export default clientDb;

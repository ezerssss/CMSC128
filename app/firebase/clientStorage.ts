import { getStorage } from "firebase/storage";
import clientApp from "./client";

const clientStorage = getStorage(clientApp);

export default clientStorage;

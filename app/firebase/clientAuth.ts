import { getAuth } from "firebase/auth";
import clientApp from "./client";

const clientAuth = getAuth(clientApp);

export default clientAuth;

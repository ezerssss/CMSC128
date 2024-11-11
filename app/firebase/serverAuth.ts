import { getAuth } from "firebase-admin/auth";
import serverApp from ".";

const serverAuth = getAuth(serverApp);

export default serverAuth;

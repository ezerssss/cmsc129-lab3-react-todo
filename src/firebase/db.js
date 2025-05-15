import app from ".";
import { getFirestore } from "firebase";

const db = getFirestore(app);
export default db;

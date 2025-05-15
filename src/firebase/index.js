import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "todo-f20a1.firebaseapp.com",
    projectId: "todo-f20a1",
    storageBucket: "todo-f20a1.firebasestorage.app",
    messagingSenderId: "298314066982",
    appId: "1:298314066982:web:ba16aec31d7d4ba4c08ae7",
};

const app = initializeApp(firebaseConfig);
export default app;

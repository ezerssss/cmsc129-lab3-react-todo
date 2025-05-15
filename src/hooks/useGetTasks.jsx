import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../firebase/db";

function useGetTasks() {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const tasksCollectionRef = collection(db, "tasks");
        const taskQuery = query(tasksCollectionRef);

        const unsubscribe = onSnapshot(taskQuery, (res) => {
            const data = res.docs.map((doc) => doc.data());
            setTasks(data);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { isLoading, tasks };
}

export default useGetTasks;

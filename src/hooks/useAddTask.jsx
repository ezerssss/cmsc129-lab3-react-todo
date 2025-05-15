import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import db from "../firebase/db";

function usePostTask() {
    const [isLoading, setIsLoading] = useState(false);

    async function addTask(task) {
        try {
            setIsLoading(true);
            const tasksCollectionRef = collection(db, "tasks");
            const taskDocRef = doc(tasksCollectionRef);

            const taskData = {
                id: taskDocRef.id,
                dateAdded: new Date().toISOString(),
                checked: false,
                ...task,
            };

            await setDoc(taskDocRef, taskData);

            return { data: taskData, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error: error };
        } finally {
            setIsLoading(false);
        }
    }

    async function editTask(id, task) {
        try {
            setIsLoading(true);
            const tasksCollectionRef = collection(db, "tasks");
            const taskDocRef = doc(tasksCollectionRef, id);

            await updateDoc(taskDocRef, task);

            return { data: task, error: null };
        } catch (error) {
            console.error(error);
            return { data: null, error: error };
        } finally {
            setIsLoading(false);
        }
    }

    return { addTask, editTask, isLoading };
}

export default usePostTask;

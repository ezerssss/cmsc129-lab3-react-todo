import { ToastContainer } from "react-toastify";
import FormTask from "./components/TaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Button from "./components/Button";

function App() {
    const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);

    return (
        <>
            <div className="p-5">
                <Header />
                <main className="w-full space-y-3 max-w-[670px]">
                    <Button
                        className="mb-0"
                        onClick={() => setIsNewTaskFormOpen((prev) => !prev)}
                    >
                        add new task
                    </Button>
                    <FormTask
                        isOpen={isNewTaskFormOpen}
                        setIsOpen={setIsNewTaskFormOpen}
                    />
                    <TaskList />
                </main>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;

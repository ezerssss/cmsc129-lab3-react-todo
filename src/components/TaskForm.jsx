import { useState } from "react";
import Button from "./Button";
import clsx from "clsx";
import usePostTask from "../hooks/useAddTask";
import {
    delay,
    formatDate,
    formatTime,
    generateDateFromString,
} from "../utils/time";
import { toast } from "react-toastify";

const defaultEmptyState = {
    title: "",
    description: "",
    priority: "Mid",
    date: "",
    time: "",
};

function TaskForm({ initialData, isOpen, setIsOpen }) {
    const { isLoading, addTask, editTask } = usePostTask();
    const [formData, setFormData] = useState({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        priority: initialData?.priority ?? "Mid",
        date: initialData ? formatDate(initialData.dueDate) : "",
        time: initialData ? formatTime(initialData.dueDate) : "",
    });

    function handleChange(e, id) {
        const localFormData = { ...formData };
        localFormData[id] = e.target.value;
        setFormData(localFormData);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { title, description, priority, date, time } = formData;

        const taskData = {
            title,
            description,
            priority,
            dueDate: generateDateFromString(date, time).toISOString(),
        };

        const toastId = toast.loading("Adding task...");
        let error = null;

        if (initialData) {
            error = (await editTask(initialData.id, taskData)).error;
        } else {
            error = (await addTask(taskData)).error;
        }

        if (!error) {
            if (!initialData) {
                setFormData(defaultEmptyState);
            }
            toast.update(toastId, {
                render: `Task ${initialData ? "edited" : "added"}!`,
                type: "success",
                isLoading: false,
            });

            setIsOpen(false);
        } else {
            toast.update(toastId, {
                render: "Something went wrong. Action did not went through.",
                type: "error",
                isLoading: false,
            });
        }

        await delay(2000);
        toast.dismiss(toastId);
    }

    return (
        <section>
            <div
                className={clsx(
                    isOpen ? "mt-3 scale-y-100 h-fit" : "scale-y-0 h-0",
                    "transition-all transition-discrete origin-top",
                )}
            >
                <form
                    className="flex flex-col gap-3 max-w-xl"
                    onSubmit={handleSubmit}
                >
                    <input
                        required
                        className="rounded-lg p-2 outline-0 border-1"
                        placeholder="Title"
                        id="title"
                        name="title"
                        onChange={(e) => handleChange(e, "title")}
                        disabled={isLoading}
                        value={formData.title}
                    />

                    <textarea
                        className="rounded-lg p-2 outline-0 border-1 w-full"
                        placeholder="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        disabled={isLoading}
                        onChange={(e) => handleChange(e, "description")}
                    />

                    <section>
                        <label htmlFor="priority">Priority:</label>
                        <select
                            required
                            name="priority"
                            id="priority"
                            className="p-2 border rounded-lg ml-1"
                            value={formData.priority}
                            disabled={isLoading}
                            onChange={(e) => handleChange(e, "priority")}
                        >
                            <option value="High">High</option>
                            <option value="Mid">Mid</option>
                            <option value="Low">Low</option>
                        </select>
                    </section>

                    <section className="flex gap-6">
                        <div>
                            <label htmlFor="date" className="relative">
                                Due Date
                                <span className="text-red-500 absolute text-xs top-0">
                                    *
                                </span>{" "}
                                :
                            </label>
                            <input
                                required
                                type="date"
                                id="date"
                                name="date"
                                className="ml-1 w-fit"
                                value={formData.date}
                                disabled={isLoading}
                                onChange={(e) => handleChange(e, "date")}
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="relative">
                                Time
                                <span className="text-red-500 absolute text-xs top-0">
                                    *
                                </span>{" "}
                                :
                            </label>
                            <input
                                required
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                disabled={isLoading}
                                onChange={(e) => handleChange(e, "time")}
                            />
                        </div>
                    </section>

                    <div className="flex gap-2">
                        <Button
                            className="bg-green-800 disabled:bg-green-800/70"
                            type="submit"
                            disabled={isLoading}
                        >
                            {initialData ? "Edit" : "Add"}
                        </Button>
                        <Button
                            className="bg-gray-500 disabled:bg-gray-500/70"
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default TaskForm;

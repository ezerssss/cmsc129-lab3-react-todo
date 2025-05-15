import { useState } from "react";
import useGetTasks from "../hooks/useGetTasks";
import Task from "./Task";
import { sortTasks } from "../utils/sort";

function TaskList() {
    const { tasks, isLoading } = useGetTasks();
    const [sortBy, setSortBy] = useState("Priority+");
    const sortedTasks = sortTasks(tasks, sortBy);

    function handleChangeSort(e) {
        setSortBy(e.target.value);
    }

    const hasNoTasks = !isLoading && tasks.length < 1;

    return (
        <>
            <section className="flex gap-2 items-center text-sm">
                <p>Sort by:</p>
                <select
                    name="sortBy"
                    id="sortBy"
                    className="p-2 border rounded-lg ml-1"
                    value={sortBy}
                    onChange={(e) => handleChangeSort(e)}
                >
                    <option value="Priority+">Priority (High - Low)</option>
                    <option value="Priority-">Priority (Low - High)</option>
                    <option value="DueDate+">Due Date closest to now</option>
                    <option value="DueDate-">Due Date farthest from now</option>
                    <option value="DateAdded+">Date Added (asc)</option>
                    <option value="DateAdded-">Date Added (desc)</option>
                </select>
            </section>
            <section>
                {isLoading && <p>Loading...</p>}
                {hasNoTasks && <p>No tasks!</p>}

                <ul>
                    {sortedTasks.map((data) => (
                        <Task key={data.id} {...data} />
                    ))}
                </ul>
            </section>
        </>
    );
}

export default TaskList;

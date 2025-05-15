export function sortTasks(tasks, sortBy) {
    const prioIndex = ["High", "Mid", "Low"];
    const now = new Date();

    switch (sortBy) {
        case "Priority+":
        case "Priority-":
            return tasks.sort(
                (a, b) =>
                    (prioIndex.indexOf(a.priority) -
                        prioIndex.indexOf(b.priority)) *
                    (sortBy == "Priority+" ? 1 : -1),
            );
        case "DueDate+":
        case "DueDate-":
            return tasks.sort(
                (a, b) =>
                    (Math.abs(new Date(a.dueDate).getTime() - now.getTime()) -
                        Math.abs(
                            new Date(b.dueDate).getTime() - now.getTime(),
                        )) *
                    (sortBy == "DueDate+" ? 1 : -1),
            );
        case "DateAdded+":
        case "DateAdded-":
            return tasks.sort(
                (a, b) =>
                    (new Date(a.dateAdded).getTime() -
                        new Date(b.dateAdded).getTime()) *
                    (sortBy == "DateAdded+" ? 1 : -1),
            );
    }

    return tasks.sort(
        (a, b) => prioIndex.indexOf(a.priority) - prioIndex.indexOf(b.priority),
    );
}

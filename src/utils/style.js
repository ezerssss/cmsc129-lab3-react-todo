export function getPriorityPillStyle(priority) {
    switch (priority) {
        case "High":
            return "bg-red-500";
        case "Mid":
            return "bg-yellow-500";
        case "Low":
            return "bg-green-500";
    }
}

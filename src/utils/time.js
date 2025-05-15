export function formatDate(dateString) {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    let mmString = (date.getMonth() + 1).toString();
    let ddString = dd.toString();

    if (dd < 10) ddString = "0" + ddString;
    if (mm < 10) mmString = "0" + mmString;

    const formattedToday = yyyy + "-" + mmString + "-" + ddString;

    return formattedToday;
}

export function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
}

export function generateDateFromString(date, time) {
    return new Date(`${date} ${time}`);
}

export async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

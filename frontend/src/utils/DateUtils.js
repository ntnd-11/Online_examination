export const getDateMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getTime = (dateString) => {
    const date = new Date(dateString);
    let hour = date.getHours();
    let minute = date.getMinutes();
    hour = hour.toString().length < 2 ? `0${hour}` : `${hour}`;
    minute = minute.toString().length < 2 ? `0${minute}` : `${minute}`;

    return `${hour}:${minute}`;
};

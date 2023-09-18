export const DATE = Array(31)
    .fill()
    .map((_, i) => {
        let date = (i + 1).toString();
        if (date.length < 2) {
            return '0' + date;
        }
        return date;
    });

export const MONTH = Array(12)
    .fill()
    .map((_, i) => {
        let month = (i + 1).toString();
        if (month.length < 2) {
            return '0' + month;
        }
        return month;
    });

const currentYear = new Date().getFullYear();
export const YEAR = Array(100)
    .fill()
    .map((_, i) => currentYear - 99 + i);

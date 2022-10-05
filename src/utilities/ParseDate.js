import { MONTH_FORMAT } from '../globals/variable';
//Function to Rebuild dates into months, date, year. 
// obj.date format is equal to = xxxx-xx-xx


const ParseDate = (str) => {

    let ms = new Date(Date.parse(str));
    ms.setMinutes(ms.getMinutes()+ms.getTimezoneOffset());

    const fmtMonth = (month, fmt) => {
        let months = [];
        if (fmt === "long") {
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return months[month];
        } else if (fmt === "short") {
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[month];
        } else {
            return month;
        }
    }

    const rls = {
        day: ms.getDate(),
        month: fmtMonth(ms.getMonth(), MONTH_FORMAT),
        year: ms.getFullYear()
    }
    return(`${rls.month} ${rls.day}, ${rls.year}`);
}

export default ParseDate;
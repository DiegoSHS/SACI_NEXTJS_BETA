import { months } from "./sortRegisters"
/**
 * Formats a date to YYYY-MM-DD HH:MM:SS or parts of the date
 * @param {Date} indate date to format
 * @param {Boolean} mode mode to format the date, true for full date, false for date parts
 * @returns 
 */
export const formatter = (indate, mode = true) => {
    const begin = {
        "isDate": indate instanceof Date && !isNaN(indate.valueOf()),
        "noNull": indate ? true : false
    }
    const date = begin.isDate && begin.noNull ? indate : new Date(Date.now())
    const padtwo = num => num.toString().padStart(2, '0')
    try {
        if (mode) {
            const fullDate = date.toLocaleDateString()
            const dateReve = fullDate.split('/').reverse()
            const datePadd = dateReve.map(padtwo).join('-')
            const fullTime = date.toTimeString().split(' ')
            return `${datePadd} ${fullTime[0]}`
        } else {
            const allDates = [date.getFullYear(), date.getMonth(), date.getDate()]
            const [year, month, day] = allDates.map(d => Number(padtwo(d)))
            return { year, month, day, monthName: months[month] }
        }
    } catch (error) {
        return
    }
}

export const dateDiff = (date1, date2) => {
    console.log(date1, date2)
    let diff = date1.getTime() - date2.getTime() / 1000 / 60 / 60
    console.log(Math.round(diff/ 1000 / 60 / 60))
    return Math.abs(Math.round(diff))
}
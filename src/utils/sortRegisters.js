
export const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const detail = (registers) => {
    const detailed = registers.map(({ dist, day, month, temp, createdAt }) => {
        return {
            dist: dist,
            temp: temp,
            createdAt: createdAt,
            day: day,
            month: month,
            monthName: months[month]
        }
    })
    return detailed
}

const monthsAvg = (registers) => {
    let year = []
    months.forEach((month) => {
        const mon = registers.filter(({ monthName }) => monthName == month)
        let details = {}
        if (isNaN((mon.reduce((a, b) => a += b.dist, 0)) / mon.length)) {
            details = {
                dist: "Sin medida",
                temp: "Sin medida",
                monthName: mon[0]?.monthname,
                month: mon[0]?.month
            }
        } else {
            details = {
                dist: (mon.reduce((a, b) => a += b.dist, 0)) / mon.length,
                temp: (mon.reduce((a, b) => a += b.temp, 0)) / mon.length,
                monthName: month,
                month: mon[0]?.month
            }
        }
        year.push(details)
    })
    return year
}

const yearDaysAvg = (registers) => {
    const alldays = months.map(m => monthDaysAvg(registers, m))
    return alldays
}

const monthDaysAvg = (registers, monthparam) => {
    const monthh = registers.filter(({ monthName }) => monthName == monthparam)
    let dias = []
    let counter = 0
    while (counter < 32) {
        if (monthh.day = counter) {
            const dia = monthh.filter(({ day }) => day == counter)
            let reg = {}
            if (isNaN(((dia.reduce((a, b) => a += b.dist, 0)) / dia.length))) {
                reg = {
                    dist: "sin medida",
                    temp: "sin medida",
                    day: counter,
                    monthName: dia[0]?.monthName,
                    month: dia[0]?.month
                }
            } else {
                reg = {
                    dist: (dia.reduce((a, b) => a += b.dist, 0)) / dia.length,
                    temp: (dia.reduce((a, b) => a += b.temp, 0)) / dia.length,
                    day: counter,
                    monthName: dia[0]?.monthName,
                    month: dia[0]?.month
                }
            }
            dias.push(reg)
        }
        counter++
    }
    return dias
}

export const obtainAvg = (registers) => {
    if (!(registers instanceof Array) || registers.length === 0) return

    const ordered = detail(registers)
    const monthsA = monthsAvg(ordered)
    const alldays = yearDaysAvg(ordered)
    return {
        ordered: ordered,
        monthavg: monthsA,
        daymonth: alldays
    }
}
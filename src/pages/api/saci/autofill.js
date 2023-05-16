import { formatter } from "@/utils/dateformat"
import { RandomInt } from "@/utils/sortRegisters"

const generateDates = () => {
  const mm = RandomInt(0, new Date(Date.now()).getMonth())
  const dd = RandomInt(0, new Date(Date.now()).getDay())
  const hrss = RandomInt(0, new Date(Date.now()).getHours())
  const mins = RandomInt(0, new Date(Date.now()).getMinutes())
  const secs = RandomInt(0, new Date(Date.now()).getSeconds())
  const date = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
  const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs), false)
  return { date, res }
}

const fullyearfiller = () => {
  let count = 0
  let registers = []
  while (count < 200) {
    const mm = RandomInt(0, 11)
    const dd = RandomInt(0, 31)
    const hrss = RandomInt(0, 23)
    const mins = RandomInt(0, 59)
    const secs = RandomInt(0, 59)
    const createdAt = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
    const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs), false)
    const register = {
      uScm: RandomFloat(1.7, 3.5, 3),
      tds: RandomInt(250, 350),
      nm: RandomInt(100, 370),
      ppm: RandomInt(300,390),
      createdAt,
      ...res
    }
    registers.push(register)
    count++
  }
  return registers
}

const filler = () => {
  let count = 0
  let registers = []
  while (count < 200) {
    const { date, res } = generateDates()
    const register = {
      id: 'humedad_aire',
      value: RandomInt(0, 19),
      date,
      ...res
    }
    
    registers.push(register)
    count++
  }
  return registers
}

export default async function handler(req, res) {
  const { body: { typee } } = req
  const registers = typee ? filler() : fullyearfiller()
  try {
    const ress = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registers)
    })
    const jsno = await ress.json()
    return res.status(201).json({ msj: `Llenado exitoso: ${jsno}` })
  } catch (error) {
    return res.status(500).json({ msj: "Error al llenar" })
  }
}

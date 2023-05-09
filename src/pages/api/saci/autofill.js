import { formatter } from "@/utils/dateformat"

const RandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const RandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals)
  return parseFloat(str)
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
    const mm = RandomInt(0, new Date(Date.now()).getMonth())
    const dd = RandomInt(0, new Date(Date.now()).getDay())
    const hrss = RandomInt(0, new Date(Date.now()).getHours())
    const mins = RandomInt(0, new Date(Date.now()).getMinutes())
    const secs = RandomInt(0, new Date(Date.now()).getSeconds())
    const createdAt = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
    const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs), false)
    const register = {
      dist: RandomInt(0, 19),
      temp: RandomInt(0, 19),
      createdAt,
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
    const ress = await fetch(process.env.API_LINK, {
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

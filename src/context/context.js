import { createContext, useContext, useEffect, useState } from "react"

export const Records = createContext([])

export const StoredContext = () => useContext(Records)

const Context = ({ children }) => {
    const [records, setrecords] = useState([])
    fetchRecords().then(res => console.log(res))
    return (
        <Records.Provider value={{records,setrecords}}>
            {children}
        </Records.Provider>
    )
}

const fetchRecords = async () => {
    const url = `http://localhost:3000/api/saci/logs`
    /*
        const sueloResult = await Promise.allSettled([
            fetch(`${url}/temperatura_suelo/`),
            fetch(`${url}/temperatura_suelo_s1/`),
            fetch(`${url}/temperatura_suelo_s2/`),
            fetch(`${url}/ph_suelo/`),
            fetch(`${url}/ph_suelo_s1/`),
            fetch(`${url}/ph_suelo_s2/`),
            fetch(`${url}/humedad_suelo/`),
            fetch(`${url}/humedad_suelo_s1/`),
            fetch(`${url}/humedad_suelo_s2/`),
        ])
    
        const aireResult = await Promise.allSettled([
            fetch(`${url}/humedad_aire/`),
            fetch(`${url}/temperatura_aire/`),
            fetch(`${url}/radiacion_solar_aire/`),
            fetch(`${url}/luminosidad/`),
            fetch(`${url}/tds_agua/`),
            fetch(`${url}/cantidad_co2/`),
        ])
*/
    const nivelAguaResult = await fetch(`${url}/nivel_agua/`)

    //const sueloValues = sueloResult.map(({ value }) => value)
    //const aireValues = aireResult.map(({ value }) => value)
    
    const agualvl = await nivelAguaResult.json()
    return agualvl
}

export default Context
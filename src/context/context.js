import { createContext, useContext, useEffect, useState } from "react"

export const Records = createContext()

export const StoredContext = () => useContext(Records)

export const Context = ({ children }) => {
    const [records, setrecords] = useState({})
    
    return (
        <Records.Provider value={{ records, setrecords }}>
            {children}
        </Records.Provider>
    )
}

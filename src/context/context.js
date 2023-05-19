import { createContext, useContext, useState } from "react"

const Records = createContext([])

export const StoredContext = () => useContext(Records)

const Context = ({ children }) => {
    const [records, setrecords] = useState([])
    console.log(records)
    return (
        <Records.Provider value={{ records, setrecords }}>
            {children}
        </Records.Provider>
    )
}


export default Context
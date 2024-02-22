import { createContext, useState } from "react";

const GeneralContext=createContext()

function GeneralContextProvider({children}){
const [previousPage,setPreviousPage]=useState([])

  return (
    <GeneralContext.Provider value={{previousPage,setPreviousPage}}>
      {children}
      </GeneralContext.Provider>
  )
}

export {GeneralContext,GeneralContextProvider}
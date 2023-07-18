import React, { createContext, useContext, useState } from "react";
import { vites } from "../utilities/myCards";

// Creación del contexto
export const FinalContext = createContext();


//creando un Hook

export const useFinalContext = ()=>{
  const miContext = useContext(FinalContext)
  if(!miContext) throw new Error('¡useFinalContext must be used in a Provider')
  return miContext
}

// Proveedor del contexto
 const FinalContextProvider = ({ children }) => {
const [modalCheck, setModalCheck]=useState(null);
const [datePlantationId, setDatePlantationId]= useState(null)
const [formBanck, setformBanck]=useState(null)
const [DetailTransaction, setDetailTransaction]=useState(null)
const [productoViteId, setProductoViteId]= useState(null) 
const [cosechaMinimaDetail, setCosechaMinimaDetail] =useState(null) 
const [PagarComponent, setPagarComponent] = useState(null)
const [transaction,setTransaction]=useState(null)
const [ asesorComponent, setAsesorComponent] = useState(null)
const [cosechasList, setCosechasList] = useState(null)
const [gananciaList, setGananciaList] = useState(null)
const [totalGananciaId, setTotalGananciaId] = useState(null)
const [ComponentCargaCuenta, setComponentCargaCuenta]=useState(null)
return (
    <FinalContext.Provider value={{ 
      modalCheck,
      setModalCheck,
      vites,
      datePlantationId, 
      setDatePlantationId,
      formBanck, 
      setformBanck,
      DetailTransaction,
      setDetailTransaction,
      productoViteId, 
      setProductoViteId,
      cosechaMinimaDetail, 
      setCosechaMinimaDetail,
      PagarComponent, 
      setPagarComponent,
      transaction,
      setTransaction,
      asesorComponent, 
      setAsesorComponent,
      cosechasList, 
      setCosechasList,
      gananciaList, 
      setGananciaList,
      totalGananciaId, 
      setTotalGananciaId,
      ComponentCargaCuenta, 
      setComponentCargaCuenta
      }}>
      {children}
    </FinalContext.Provider>
  );
};

export default FinalContextProvider;

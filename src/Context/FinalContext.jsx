import React, { createContext, useContext, useState } from "react";
import { importedFolderCards } from "../utilities/myCards";
import { projectsVarios } from "../utilities/myCards";
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
  const projects = [
    { id: 1, name: "Project 1", status: "completed" },
    { id: 2, name: "Project 2", status: "in-progress" },
    { id: 3, name: "Project 3", status: "medium" },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [importSelect, setImportSelect]= useState(null)
  const [Flow, setFlow]=useState(null)
  const [searchBarView, setSearchBarView]= useState(null)
  const [HeaderWithouLogin, setHeaderWithoutLogin]=useState(null)
  const [shareModal, setModalShare] = useState(false);
  const [modalNewMember, setModalNewMember] = useState(false);
  const [modalMember, setModalMember] = useState(false);


  return (
    <FinalContext.Provider value={{ 
      setModalMember,
      modalMember,
      setModalNewMember,
      modalNewMember,
      projects, 
      selectedProjectId, 
      setSelectedProjectId, 
      importedFolderCards,
      importSelect,
      setImportSelect,
      Flow,
      setFlow,
      searchBarView,
      setSearchBarView,
      projectsVarios,
      HeaderWithouLogin,
      setHeaderWithoutLogin,
      shareModal,
      setModalShare
      
      }}>
      {children}
    </FinalContext.Provider>
  );
};

export default FinalContextProvider;

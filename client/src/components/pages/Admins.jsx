// IMPORTS: dependencies
import React from 'react';
import { Route, Routes } from "react-router-dom";
// IMPORTS: components
import ListManager from "../../modules/ListManager";
import ElementListPage from "../other/ElementListPage";
import ElementMgmentPage from "../other/ElementMgmentPage";
import AdminForm from "../formularios/AdminForm";
import axios from 'axios';
// IMPORTS: data
import { adminFields } from "../../data/AdminsData";

const BASE_API_URL = 'http://localhost:8000/api';

// MAIN COMPONENT
export default function Admins() {
  const [list, setAdminsList] = React.useState([]);

  // Cargar la lista de autores al montar el componente
  React.useEffect(() => {
    fetchAdmins();
  }, []);

  // Función para obtener la lista de administradores desde el servidor
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/admins`);
      setAdminsList(response.data);
      console.log(response.data);
      console.log('Atencion...');
      console.log(adminFields);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };
  
  // Functions to handle adding, editing and searching for admins
  // to/from the list
  function addMember(newMember) {
    ListManager.add(list, newMember);
  }
  function editMember(member) {
    ListManager.editElement(list, member);
  }
  function searchMember(id) {
    return ListManager.searchElementById(list, id);
  }

  return (
    <Routes>
      {/*ADMINS INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage list={list} fields={adminFields} name="Admin" />
        }
      />
      {/*CREATE NEW ADMIN ROUTE*/}
      <Route
        path="agregar"
        element={
        <AdminForm/>
        
        }
      />
      {/*EDIT ADMIN ROUTE*/}
      <Route
        path="editar/:id"
        element={
          <ElementMgmentPage
            handleMember={editMember}
            findElementById={searchMember}
            fields={adminFields}
            name="Administrador"
            classN="admins"
          />
        }
      />
    </Routes>
  );
}

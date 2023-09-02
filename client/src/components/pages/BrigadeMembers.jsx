// IMPORTS: dependencies
import React from 'react';
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// IMPORTS: components
import ListManager from "../../modules/ListManager";
import ElementListPage from "../other/ElementListPage";
import ElementMgmentPage from "../other/ElementMgmentPage";
import BrigadistaForm from '../formularios/BrigadistaForm';
import axios from 'axios';
// IMPORTS: data
import {
  initialBrigMembersList,
  brigMemberFields,
} from "../../data/BrigMembersData";

const BASE_API_URL = 'http://localhost:8000/api';

// MAIN COMPONENT
export default function BrigMembRoutes() {
  const [list_, _] = useState(initialBrigMembersList);
  const [list, setBrigadistasList] = React.useState([]);

  // Cargar la lista de autores al montar el componente
  React.useEffect(() => {
    fetchBrigadistas();
  }, []);

  // Función para obtener la lista de administradores desde el servidor
  const fetchBrigadistas = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/brigadistas`);
      setBrigadistasList(response.data);
      console.log(response.data);
      console.log('Atencion...');
      console.log(brigMemberFields);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Functions to handle adding, editing and searching for brigade
  // members to/from the list
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
      {/*BRIGADE MEMBERS INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage
            list={list}
            fields={brigMemberFields}
            name="Brigadista"
          />
        }
      />
      {/*CREATE NEW BRIGADE MEMBER ROUTE*/}
      <Route
        path="agregar"
        element={
          <BrigadistaForm/>
        }
      />
      {/*EDIT BRIGADE MEMBER ROUTE*/}
      <Route
        path="editar/:id"
        element={
          <ElementMgmentPage
            handleMember={editMember}
            findElementById={searchMember}
            fields={brigMemberFields}
            name="Brigadista"
            classN="brigs"
          />
        }
      />
    </Routes>
  );
}

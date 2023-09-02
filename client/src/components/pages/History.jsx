// IMPORTS: dependencies
import React from 'react';
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// IMPORTS: components
import ListManager from "../../modules/ListManager";
import ElementListPage from "../other/ElementListPage";
import ElementMgmentPage from "../other/ElementMgmentPage";
import axios from 'axios';
// IMPORTS: data
import { initialHistoryList, historyFields } from "../../data/HistoryData";

const BASE_API_URL = 'http://localhost:8000/api';

// MAIN COMPONENT
export default function History() {
  const [list_, _] = useState(initialHistoryList);
  const [list, setHistoryList] = React.useState([]);

  // Cargar la lista de autores al montar el componente
  React.useEffect(() => {
    fetchHistory();
  }, []);

  // Función para obtener la lista de administradores desde el servidor
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/alertas`);
      setHistoryList(response.data);
      console.log(response.data);
      console.log('Atencion...');
      console.log(historyFields);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Functions to handle adding, editing and searching for events
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
      {/*EVENTS INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage list={list} fields={historyFields} dateFilter />
        }
      />
      {/*CREATE NEW EVENT ROUTE*/}
      <Route
        path="agregar"
        element={
          <ElementMgmentPage
            handleMember={addMember}
            fields={historyFields}
            classN="history"
          />
        }
      />
      {/*EDIT EVENT ROUTE*/}
      <Route
        path="editar/:id"
        element={
          <ElementMgmentPage
            handleMember={editMember}
            findElementById={searchMember}
            fields={historyFields}
            classN="history"
          />
        }
      />
    </Routes>
  );
}

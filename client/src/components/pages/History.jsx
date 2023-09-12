// IMPORTS: dependencies
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: components
import ElementListPage from "../other/ElementListPage";
// IMPORTS: data
import ListManager from "../../modules/ListManager";
import { historyFields } from "../../data/HistoryData";

const BASE_API_URL = "http://localhost:8000/api";

// MAIN COMPONENT
export default function History() {
  const [list, setHistoryList] = useState([]);

  // Cargar la lista de autores al montar el componente
  useEffect(() => {
    fetchHistory();
  }, []);

  // Función para obtener la lista de administradores desde el servidor
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/alertas`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      setHistoryList(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  function deleteHandler(list, ids) {
    ListManager.deleteElement(list, ids, `${BASE_API_URL}/alerta`);
  }

  return (
    <Routes>
      {/*EVENTS INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage
            list={list}
            fields={historyFields}
            deleteHandler={deleteHandler}
            dateFilter
            readOnly
          />
        }
      />
      {/*SEE EVENT DETAILS ROUTE*/}
      <Route path="detalles/:id" element={<div>Detalles Evento</div>} />
    </Routes>
  );
}

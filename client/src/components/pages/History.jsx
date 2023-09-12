// IMPORTS: dependencies
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: components
import ElementListPage from "../other/ElementListPage";
// import ElementMgmentPage from "../other/ElementMgmentPage";
// IMPORTS: data
import ListManager from "../../modules/ListManager";
import {
  // initialHistoryList,
  historyFields,
} from "../../data/HistoryData";

const BASE_API_URL = "http://localhost:8000/api";

// MAIN COMPONENT
export default function History() {
  // const [list_, _] = useState(initialHistoryList);
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
      // console.log(response.data);
      // console.log("Atencion...");
      // console.log(historyFields);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // Functions to handle adding, editing and searching for events
  // to/from the list
  // function addMember(newMember) {
  //   ListManager.add(list, newMember);
  // }
  // function editMember(member) {
  //   ListManager.editElement(list, member);
  // }
  // function searchMember(id) {
  //   return ListManager.searchElementById(list, id);
  // }

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

      {/*CREATE NEW EVENT ROUTE*/}
      {/* <Route
        path="agregar"
        element={
          <ElementMgmentPage
            handleMember={addMember}
            fields={historyFields}
            classN="history"
          />
        }
      /> */}
      {/*EDIT EVENT ROUTE*/}
      {/* <Route
        path="editar/:id"
        element={
          <ElementMgmentPage
            handleMember={editMember}
            findElementById={searchMember}
            fields={historyFields}
            classN="history"
          />
        }
      /> */}
    </Routes>
  );
}

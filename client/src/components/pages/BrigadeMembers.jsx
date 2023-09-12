// IMPORTS: dependencies
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: custom components
import ElementListPage from "../other/ElementListPage";
import BrigadistaForm from "../formularios/BrigadistaForm";
// IMPORTS: data
import ListManager from "../../modules/ListManager";
import { brigMemberFields } from "../../data/BrigMembersData";

const BASE_API_URL = "http://localhost:8000/api";

// MAIN COMPONENT
export default function BrigMembRoutes() {
  const [list, setBrigadistasList] = useState([]);

  // Cargar la lista de autores al montar el componente
  useEffect(() => {
    fetchBrigadistas();
  }, []);

  // Función para obtener la lista de administradores desde el servidor
  const fetchBrigadistas = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/brigadistas`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      setBrigadistasList(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  function deleteHandler(list, ids) {
    ListManager.deleteElement(list, ids, `${BASE_API_URL}/brigadista`);
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
            deleteHandler={deleteHandler}
          />
        }
      />
      {/*CREATE NEW BRIGADE MEMBER ROUTE*/}
      <Route path="agregar" element={<BrigadistaForm list={list} />} />
      {/*EDIT BRIGADE MEMBER ROUTE*/}
      <Route path="editar/:id" element={<BrigadistaForm list={list} />} />
    </Routes>
  );
}

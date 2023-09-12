// IMPORTS:
import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: custom components
import ElementListPage from "../other/ElementListPage";
import AdminForm from "../formularios/AdminForm";
// IMPORTS: data
import { adminFields } from "../../data/AdminsData";
import ListManager from "../../modules/ListManager";

const BASE_API_URL = "http://localhost:8000/api";

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
      const response = await axios.get(`${BASE_API_URL}/admins`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      setAdminsList(response.data);
      // console.log(response.data);
      // console.log('Atencion...');
      // console.log(adminFields);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  function deleteHandler(list, ids) {
    ListManager.deleteElement(list, ids, `${BASE_API_URL}/admin`);
    // ids.forEach((id) => {
    //   axios.delete(`${BASE_API_URL}/admin/${id}`).catch(console.log);
    // });
    // fetchAdmins();
  }

  return (
    <Routes>
      {/*ADMINS INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage
            list={list}
            fields={adminFields}
            name="Admin"
            deleteHandler={deleteHandler}
          />
        }
      />
      {/*CREATE NEW ADMIN ROUTE*/}
      <Route path="agregar" element={<AdminForm list={list} />} />
      {/*EDIT ADMIN ROUTE*/}
      <Route path="editar/:id" element={<AdminForm list={list} />} />
    </Routes>
  );
}

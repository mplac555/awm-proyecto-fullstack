// IMPORTS: dependencies
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: components
import ElementListPage from "../other/ElementListPage";
import OwnerForm from "../formularios/OwnerForm";
import VehicleForm from "../formularios/VehicleForm";
// IMPORTS: data
import ListManager from "../../modules/ListManager";
import { ownerFields, vehicleFields } from "../../data/VehiclesData";

const BASE_API_URL = "http://localhost:8000/api";

// MAIN COMPONENT
export default function VehiclesInfo() {
  const [owners, setOwnersList] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Cargar la lista de propietarios al montar el componente
  useEffect(() => {
    fetchOwners();
  }, []);

  // Función para obtener la lista de propietarios desde el servidor
  const fetchOwners = async () => {
    try {
      console.log(sessionStorage?.token);
      const response = await axios.get(`${BASE_API_URL}/owners`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      setOwnersList(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  function deleteOwnerHandler(list, ids) {
    ListManager.deleteElement(list, ids, `${BASE_API_URL}/owner`);
  }
  function deleteCarHandler(list, carIds, ownerId) {
    ListManager.deleteElement(
      list,
      carIds,
      `${BASE_API_URL}/owner/${ownerId}/car`
    );
  }

  function updateSecondary(list) {
    setVehicles(list);
  }

  return (
    <Routes>
      {/*OWNERS/VEHICLES INDEX ROUTE: TABLE AND IT'S FILTERS*/}
      <Route
        index
        element={
          <ElementListPage
            list={owners}
            fields={ownerFields}
            name="Propietario"
            deleteHandler={deleteOwnerHandler}
            secondaryFields={vehicleFields}
            secondaryName="Vehículo"
            secondaryFieldName="ownerCars"
            secondaryPath="vehiculo"
            secondaryDeleteHandler={deleteCarHandler}
            updateSecondary={updateSecondary}
            baseApiUrl={`${BASE_API_URL}/owner`}
            secondaryApiUrl={"cars"}
            vehicleTable
          />
        }
      />
      {/*CREATE NEW OWNER ROUTE*/}
      <Route path="agregar" element={<OwnerForm list={owners} />} />
      {/*EDIT OWNER ROUTE*/}
      <Route path="editar/:id" element={<OwnerForm list={owners} />} />
      {/*SECONDARY LIST (VEHICLES) ROUTES*/}
      <Route path=":id/vehiculo">
        {/*CREATE NEW VEHICLE ROUTE*/}
        <Route path="agregar" element={<VehicleForm list={vehicles} />} />
        {/*EDIT VEHICLE ROUTE*/}
        <Route path="editar/:carID" element={<VehicleForm list={vehicles} />} />
      </Route>
    </Routes>
  );
}

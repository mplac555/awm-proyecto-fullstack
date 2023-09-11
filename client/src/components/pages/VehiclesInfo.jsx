// IMPORTS: dependencies
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
// IMPORTS: components
import ElementListPage from "../other/ElementListPage";
import OwnerForm from "../formularios/OwnerForm";
import VehicleForm from "../formularios/VehicleForm";
// import ElementMgmentPage from "../other/ElementMgmentPage";
// IMPORTS: data
import ListManager from "../../modules/ListManager";
import {
  ownerFields,
  // initialOwnersList,
  vehicleFields,
} from "../../data/VehiclesData";

const BASE_API_URL = "http://localhost:8000/api";

// MAIN COMPONENT
export default function VehiclesInfo() {
  //const [owners_, _] = useState(initialOwnersList);
  const [owners, setOwnersList] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Cargar la lista de propietarios al montar el componente
  useEffect(() => {
    fetchOwners();
  }, []);

  // Función para obtener la lista de propietarios desde el servidor
  const fetchOwners = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/owners`);
      setOwnersList(response.data);
      // console.log(response.data);
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

  // Functions to handle adding, editing and searching for owners
  // to/from the list
  // function addMember(newMember) {
  //   ListManager.add(owners, newMember);
  // }
  // function editMember(member) {
  //   ListManager.editElement(owners, member);
  // }
  // function searchMember(id) {
  //   return ListManager.searchElementById(owners, id);
  // }

  // Functions to handle adding, editing and searching for vehicles
  // to/from the list
  // function addVehicle(newVehicle) {
  //   ListManager.add(vehicles, newVehicle);
  // }
  // function editVehicle(vehicle) {
  //   ListManager.editElement(vehicles, vehicle);
  // }
  // function searchVehicle(id) {
  //   return ListManager.searchElementById(vehicles, id);
  // }

  // Delegate function for the child to be able to update
  // the state of its parent (this component)
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
          />
        }
      />
      {/*CREATE NEW OWNER ROUTE*/}
      <Route path="agregar" element={<OwnerForm list={owners} />} />
      {/*EDIT OWNER ROUTE*/}
      <Route path="editar/:id" element={<OwnerForm list={owners} />} />
      {/* <Route
        path="editar/:id"
        element={
          <ElementMgmentPage
            handleMember={editMember}
            findElementById={searchMember}
            fields={ownerFields}
            name="Propietario"
            classN="owners"
          />
        }
      /> */}
      {/*SECONDARY LIST (VEHICLES) ROUTES*/}
      <Route path=":id/vehiculo">
        {/*CREATE NEW VEHICLE ROUTE*/}
        <Route path="agregar" element={<VehicleForm list={vehicles} />} />
        {/* <Route
          path="agregar"
          element={
            <ElementMgmentPage
              handleMember={addVehicle}
              fields={vehicleFields}
              name="Vehículo"
              classN="vehicles"
              secondary
              />
            }
        /> */}
        {/*EDIT VEHICLE ROUTE*/}
        <Route path="editar/:carID" element={<VehicleForm list={vehicles} />} />
        {/* <Route
          path="editar/:id"
          element={
            <ElementMgmentPage
              handleMember={editVehicle}
              findElementById={searchVehicle}
              fields={vehicleFields}
              name="Vehículo"
              classN="vehicles"
              secondary
            />
          }
        /> */}
      </Route>
    </Routes>
  );
}

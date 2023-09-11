// IMPORTS: dependencies
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// IMPORTS: Layouts
import MainLayout from "./components/layouts/MainLayout";

// IMPORTS: Pages
import Home from "./components/pages/Home";
import VehiclesInfo from "./components/pages/VehiclesInfo";
import BrigMembRoutes from "./components/pages/BrigadeMembers";
import Admins from "./components/pages/Admins";
import History from "./components/pages/History";
import Login from "./components/pages/Login";
import BrigadeProfile from "./components/pages/BrigadeProfile";
import BrigadeIncident from "./components/pages/BrigadeIncident";
import BrigadeScan from "./components/pages/BrigadeScan";

// "Home" Component, isolated for enhanced code reading
function HomeComponent() {
  return (
    <Home
      comunityName="Amaguaña"
      userName="Jeremy Peralbo"
      membersNo={10}
      adminsNo={2}
    />
  );
}

// BASIC ROUTES STRUCTURE
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeComponent />} />
        {/* <Route path="vehiculos/*" element={<VehiclesInfo />} /> */}
        <Route path="propietarios/*" element={<VehiclesInfo />} />
        <Route path="brigadistas/*" element={<BrigMembRoutes />} />
        <Route path="administradores/*" element={<Admins />} />
        <Route path="historial/*" element={<History />} />
      </Route>

      {/*Brigade pages*/}
      <Route path="login" element={<Login />} />
      <Route path="/profile/:name" element={<BrigadeProfile />} />
      <Route path="/profile/:name/Incident" element={<BrigadeIncident />} />
      <Route path="/profile/:name/Scan" element={<BrigadeScan />} />

      <Route path="*" element={<>Error 404</>} />
    </>
  )
);

// MAIN COMPONENT
export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

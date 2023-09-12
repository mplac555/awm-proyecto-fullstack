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
import Login from "./components/pages/Login";
// Admin
import Home from "./components/pages/Home";
import VehiclesInfo from "./components/pages/VehiclesInfo";
import BrigMembRoutes from "./components/pages/BrigadeMembers";
import Admins from "./components/pages/Admins";
import History from "./components/pages/History";
// Brig
import BrigadeProfile from "./components/pages/BrigMembPages/BrigadeProfile";
import BrigadeIncident from "./components/pages/BrigMembPages/BrigadeIncident";
import BrigadeScan from "./components/pages/BrigMembPages/BrigadeScan";

// IMPORTS: Utils
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import PublicRoutes from "./components/utils/PublicRoutes";

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

// MAIN COMPONENT
export default function App() {
  // BASIC ROUTES STRUCTURE
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/*Admin Routes*/}
        <Route path="/" element={<ProtectedRoutes role="admin" />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomeComponent />} />
            {/* <Route path="vehiculos/*" element={<VehiclesInfo />} /> */}
            <Route path="propietarios/*" element={<VehiclesInfo />} />
            <Route path="brigadistas/*" element={<BrigMembRoutes />} />
            <Route path="administradores/*" element={<Admins />} />
            <Route path="historial/*" element={<History />} />
          </Route>
        </Route>

        {/*Brigade Members pages*/}
        <Route path="/profile" element={<ProtectedRoutes role="brig" />}>
          <Route index element={<BrigadeProfile />} />
          <Route path="Incident" element={<BrigadeIncident />} />
          <Route path="Scan" element={<BrigadeScan />} />
        </Route>

        {/*Authenticated pages*/}
        <Route path="/prohibido" element={<ProtectedRoutes />}>
          <Route index element={<h1>PROHIBIDO</h1>} />
        </Route>

        {/*Public Routes*/}
        <Route path="login" element={<PublicRoutes />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="*" element={<>Error 404</>} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

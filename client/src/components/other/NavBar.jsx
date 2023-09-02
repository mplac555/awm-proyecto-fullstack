// IMPORTS: dependencies
import { useState } from "react";
// IMPORTS: components
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";

// Possible urls, respectively associated to a selected tab in the navigation bar
const tabs = [
  "/",
  "/vehiculos",
  "/brigadistas",
  "/administradores",
  "/historial",
];

// Current url
var url = window.location.pathname;
if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1);

export default function NavBar() {
  const [selectedTab, setSelectedTab] = useState(tabs.indexOf(url));

  return (
    <Tabs
      className="nav-bar"
      value={selectedTab === -1 ? false : selectedTab}
      onChange={(_, selectedIndex) => setSelectedTab(selectedIndex)}
      centered
      indicatorColor="secondary"
      textColor="inherit"
    >
      <Tab component={Link} to={"/"} label="Inicio" />
      <Tab component={Link} to={"vehiculos"} label="Información de Vehículos" />
      <Tab
        component={Link}
        to={"brigadistas"}
        label="Información de Brigadistas"
      />
      <Tab component={Link} to={"administradores"} label="Administradores" />
      <Tab component={Link} to={"historial"} label="Historial" />
    </Tabs>
  );
}

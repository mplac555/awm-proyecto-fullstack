// IMPORTS: dependencies
import { Link, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Button, createTheme } from "@mui/material";
// IMPORTS: components
import NavBar from "../other/NavBar";

// Theme for changing color to the NavBar
const theme = createTheme({
  palette: {
    secondary: {
      main: "#e5e5e5",
    },
  },
});

// MAIN COMPONENT
export default function MainLayout() {
  return (
    <div className="main-layout">
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
      <div className="page-container pagina">
        <Outlet />
      </div>
      {/* <Button variant="outlined" component={Link} to="/login">
        CERRAR SESIÓN
      </Button> */}
    </div>
  );
}

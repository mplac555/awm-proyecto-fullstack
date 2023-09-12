// IMPORTS: components
import { Link, useNavigate } from "react-router-dom";
import Card from "../other/Card";
import { Button } from "@mui/material";

// MAIN COMPONENT
export default function Home(props) {
  // This auxiliary variable contains the fields to be
  // programmatically rendered.
  const parameters = [
    { id: "comunityName", label: "Nombre de la Comunidad" },
    { id: "userName", label: "Usuario" },
    { id: "membersNo", label: "Número de Brigadistas" },
    { id: "adminsNo", label: "Número de Administradores" },
  ];

  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div className="home-page">
      <div className="user-data">
        {/*CONTACT CARD*/}
        <Card name="Jeremy" />

        {/*FIELDS, PREVIOUSLY ESTABLISHED*/}
        <div className="person-properties">
          {parameters.map((pram) => (
            <div key={pram.id}>
              <div>
                <p>
                  <strong>{pram.label}:</strong>
                </p>
                <p>{props[pram.id]}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/*BUTTONS*/}
      <div className="buttons">
        <Button variant="outlined">Editar Perfil</Button>
        <Button variant="outlined" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>

      {/* <div style={{ width: "250px" }}>
        <Button variant="outlined" component={Link} to="/login">
        <Button variant="outlined" onClick={handleLogout}>
          CERRAR SESIÓN
        </Button>
      </div> */}
    </div>
  );
}

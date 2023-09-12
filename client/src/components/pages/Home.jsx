// IMPORTS: components
import { useNavigate } from "react-router-dom";
import Card from "../other/Card";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_API_URL = "http://localhost:8000/api";

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

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.clear();
    navigate("/login");
  }

  async function fetchData() {
    try {
      let res = await axios.get(`${BASE_API_URL}/admins`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      let noAdm = res?.data?.length;
      res = await axios.get(`${BASE_API_URL}/brigadistas`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      });
      let noBrig = res?.data?.length;
      setData((prev) => ({ ...prev, membersNo: noBrig, adminsNo: noAdm }));
    } catch (error) {
      console.log(
        `!!Existió algún problema al tratar de recuperar los datos desde la base de datos!! (${error})`
      );
    }
  }
  const user = JSON.parse(sessionStorage?.user);

  useEffect(() => {
    setData({ ...props, userName: `${user.adminName} ${user.adminLastname}` });
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="home-page">
      <div className="user-data">
        {/*CONTACT CARD*/}
        <Card name={user.adminName} />

        {/*FIELDS, PREVIOUSLY ESTABLISHED*/}
        <div className="person-properties">
          {parameters.map((pram) => (
            <div key={pram.id}>
              <div>
                <p>
                  <strong>{pram.label}:</strong>
                </p>
                <p>
                  {(pram.id === "membersNo" || pram.id === "adminsNo") &&
                  loading
                    ? "..."
                    : data[pram.id]}
                </p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/*BUTTONS*/}
      <div className="buttons">
        <Button
          variant="outlined"
          onClick={() => navigate(`administradores/editar/${user._id}`)}
        >
          Editar Perfil
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

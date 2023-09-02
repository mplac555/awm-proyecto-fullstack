// IMPORTS: dependencies
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// IMPORTS: icon
import { ArrowBackIosNewRounded } from "@mui/icons-material";
// IMPORTS: components
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { genreOptions } from "../../data/BrigMembersData";

// MAIN COMPONENT
export default function ElementMgmentPage({
  handleMember,
  findElementById,
  fields,
  name,
  classN,
  secondary,
}) {
  const [element, setElement] = useState({
    id: "",
    ...Object.fromEntries(
      new Map(fields.map((field) => [field.id, ""])).entries()
    ),
  });

  // Retrieve element from url parameters (edit version)
  const { id: idURL } = useParams();
  useEffect(() => {
    if (idURL !== undefined) {
      setElement(findElementById(idURL));
    }
  }, []);

  // Handles the inputs and updates the element's state
  const onChangeHandler = (e) => {
    setElement({ ...element, [e.target.name]: e.target.value });
  };

  // Used to save the element on the list (new or edit)
  // This invokes the specific handler gotten from the props
  const navigate = useNavigate();
  const saveElementHandler = () => {
    handleMember(element);
    navigate(secondary ? "../.." : "..");
  };

  return (
    <div className="form-container">
      {/*BACK BUTTON*/}
      <Tooltip className="btn-back" title="Regresar">
        <IconButton component={Link} to={secondary ? "../.." : ".."}>
          <ArrowBackIosNewRounded fontSize="large" />
        </IconButton>
      </Tooltip>

      <div className="main-section">
        {/*PAGE HEADING*/}
        <Typography variant="h4">
          Información de {name || "Elemento"}
        </Typography>

        {/*ACTUAL FORM*/}
        <FormControl className={`form ${classN}`}>
          {fields.map((field) => (
            <Box key={field.id} sx={{ width: "100%", gridArea: field.id }}>
              <TextField
                name={field.id}
                label={field.label}
                variant="filled"
                select={field.id === "genre"}
                value={element[field.id] || ""}
                onChange={onChangeHandler}
              >
                {field.id === "genre" &&
                  Object.keys(genreOptions).map((option) => {
                    return (
                      <MenuItem key={option} value={option}>
                        {genreOptions[option]}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Box>
          ))}

          {/*SAVE BUTTON*/}
          <Button
            id="save"
            className="button"
            variant="contained"
            onClick={saveElementHandler}
          >
            Registrar {name || "Elemento"}
          </Button>
          {/*CANCEL BUTTON*/}
          <Button
            id="cancel"
            className="button"
            variant="outlined"
            component={Link}
            to={secondary ? "../.." : ".."}
          >
            Cancelar
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

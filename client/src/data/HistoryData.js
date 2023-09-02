import moment from "moment";

export const historyFields = [
  { id: "alertaDate", label: "Fecha" },
  { id: "alertaHour", label: "Hora de Registro" },
  { id: "brigName", label: "Nombre de Brigadista" },
  { id: "brigLastname", label: "Apellido de Brigadista" },
  { id: "carPlate", label: "Vehículo (Real)" },
  { id: "alertaIncident", label: "Incidente" },
  { id: "alertaDescription", label: "Observación" },
];
export const initialHistoryList = [
  {
    id: 1,
    datetime: moment("2023-05-21 04:30:54", "YYYY-MM-DD HH:mm:ss"),
    brigMemb: "Jorge Velasco",
    plateNo: "PC5079",
    incident: "Ninguno",
    observation: "No",
  },
  {
    id: 2,
    datetime: moment("2023-05-18 23:45:00", "YYYY-MM-DD HH:mm:ss"),
    brigMemb: "Karen Valdiviezo",
    plateNo: "GY0056",
    incident: "Suplantado",
    observation: "Sí",
  },
  {
    id: 3,
    datetime: moment("2023-05-18 12:45:30", "YYYY-MM-DD HH:mm:ss"),
    brigMemb: "José Montero",
    plateNo: "HO6347",
    incident: "No Registrado",
    observation: "Sí",
  },
];
// export const initialHistoryList = [
//   {
//     id: 1,
//     date: "2023-05-21",
//     time: "04:30:54",
//     brigMemb: "Jorge Velasco",
//     plateNo: "PC5079",
//     incident: "Ninguno",
//     observation: "No",
//   },
//   {
//     id: 2,
//     date: "2023-05-18",
//     time: "23:45:00",
//     brigMemb: "Karen Valdiviezo",
//     plateNo: "GY0056",
//     incident: "Suplantado",
//     observation: "Sí",
//   },
//   {
//     id: 3,
//     date: "2023-05-18",
//     time: "12:45:30",
//     brigMemb: "José Montero",
//     plateNo: "HO6347",
//     incident: "No Registrado",
//     observation: "Sí",
//   },
// ];

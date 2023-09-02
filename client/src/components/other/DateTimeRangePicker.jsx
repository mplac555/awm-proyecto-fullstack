// IMPORTS: dependencies
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import { useState } from "react";
// IMPORTS: icon
import { DateRange } from "@mui/icons-material";

// MAIN COMPONENT
export default function DateTimeRangePicker({
  minDate,
  maxDate,
  filterHandler,
}) {
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const [filtered, setFiltered] = useState(false);

  // Optional preset ranges of dates and times
  let ranges = {
    Hoy: [moment().startOf("day"), maxDate],
    Ayer: [
      moment().subtract(1, "day").startOf("day"),
      moment().subtract(1, "day").endOf("day"),
    ],
    "Esta semana": [moment().startOf("week").add(1, "day"), maxDate],
    "Este mes": [moment().startOf("month"), maxDate],
    "Mes Anterior": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
    "Últimas 24 horas": [moment().subtract(24, "hours"), maxDate],
    "Últimos 7 días": [moment().subtract(6, "days"), maxDate],
    "Últimos 30 días": [moment().subtract(29, "days"), maxDate],
    "Últimos 30 días": [moment().subtract(29, "days"), maxDate],
    "Sin filtro": [minDate, maxDate],
  };

  // Locale parameters for the DateTimeRangeContainer component
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
    days: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    fromDate: "Desde",
    toDate: "Hasta",
    selectingFrom: "Seleccionando desde...",
    selectingTo: "Seleccionando hasta...",
    customRangeLabel: "Específico",
    maxDate: "Fecha Máxima",
    close: "Cerrar",
    apply: "Aplicar",
    cancel: "Cancelar",
  };

  // Callback function executed when the Apply Button is pressed
  function applyCallback(start, end) {
    setStart(start);
    setEnd(end);
    let filtered =
      end.diff(start, "minutes") !== maxDate.diff(minDate, "minutes");
    setFiltered(filtered);
    filterHandler(filtered, start, end);
  }

  // Auxiliary variable to make formated start and end dates easier to call
  let dates = [
    start.format("DD/MM/YYYY – HH:mm"),
    end.format("DD/MM/YYYY – HH:mm"),
  ];

  return (
    <div className="picker">
      {/*DateTimeRange COMPONENT*/}
      <DateTimeRangeContainer
        ranges={ranges}
        start={start}
        end={end}
        local={local}
        maxDate={moment()}
        applyCallback={applyCallback}
        smartMode
        pastSearchFriendly
      >
        {/*TEXTAREA FOR THE start DATETIME*/}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por fecha"
            aria-describedby="start-date"
            value={
              !filtered
                ? ""
                : start.date() === end.date() &&
                  (end.diff(start, "minutes") === 1439 ||
                    (moment().format("YYYY-MM-DD") ===
                      maxDate.format("YYYY-MM-DD") &&
                      end.diff(start, "minutes") ===
                        maxDate.diff(moment().startOf("day"), "minutes")))
                ? start.format("DD/MM/YYYY")
                : dates[0]
            }
            onChange={() => {}}
          />
          <span className="input-group-text" id="start-date">
            <DateRange />
          </span>
        </div>

        {/*TEXTAREA FOR THE end DATETIME (hidden by default)*/}
        {filtered && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Hasta"
              aria-describedby="end-date"
              value={
                start.date() === end.date() &&
                (end.diff(start, "minutes") === 1439 ||
                  (moment().format("YYYY-MM-DD") ===
                    maxDate.format("YYYY-MM-DD") &&
                    end.diff(start, "minutes") ===
                      maxDate.diff(moment().startOf("day"), "minutes")))
                  ? ""
                  : dates[1]
              }
              onChange={() => {}}
            />
            <span className="input-group-text" id="end-date">
              <DateRange />
            </span>
          </div>
        )}
      </DateTimeRangeContainer>
    </div>
  );
}

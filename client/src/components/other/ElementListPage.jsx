// IMPORTS: dependencies
import { useState } from "react";
import moment from "moment";
import ListManager from "../../modules/ListManager";
// IMPORTS: icon
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// IMPORTS: components
import DateTimeRangePicker from "./DateTimeRangePicker";
import Table from "./Table";

// MAIN COMPONENT
export default function ElementListPage({
  list,
  fields,
  searchPlaceHolder,
  name,
  deleteHandler,
  secondaryFieldName,
  secondaryFields,
  secondaryName,
  secondaryPath,
  dateFilter,
  updateSecondary,
}) {
  const [query, setQuery] = useState("");
  const [currentSelection, setCurrentSelection] = useState([]);
  const [momentFiltering, setMomentFiltering] = useState(false);

  // Second list (2-table version) handler
  const setCurrent = (current) => {
    let secondList = [];
    current.forEach((x) => secondList.push(...x[secondaryFieldName]));
    setCurrentSelection(secondList);
    updateSecondary(secondList);
  };

  // DateTime filtering (history version) handler
  function filterByDate(filtered, start, end) {
    setMomentFiltering(filtered && { start, end });
  }

  return (
    <div className="page-main-section">
      {/*OPTIONAL DATETIME RANGE PICKER (disabled by default)*/}
      {dateFilter && (
        <DateTimeRangePicker
          minDate={moment().subtract(5, "years")}
          maxDate={moment()}
          filterHandler={filterByDate}
        />
      )}

      {/*SEARCH BAR*/}
      <div className="search-bar input-group mb-3 ">
        <input
          type="text"
          className="form-control"
          placeholder={searchPlaceHolder || "Buscar"}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchRoundedIcon className="search-icon" />
      </div>

      <div className="tables-container">
        {/*PRIMARY TABLE*/}
        <Table
          className="table"
          columns={fields}
          rows={list}
          // deleteRowHandler={ListManager.deleteElement}
          deleteRowHandler={deleteHandler}
          name={name || "Elemento"}
          query={query}
          setCurrentSelection={secondaryFields && setCurrent}
          dateFilter={dateFilter && momentFiltering}
        />

        {/*OPTIONAL PRIMARY TABLE (disabled by default)*/}
        {secondaryFields && (
          <Table
            className="table"
            columns={secondaryFields}
            rows={currentSelection}
            deleteRowHandler={ListManager.deleteElement}
            name={secondaryName || "Elemento"}
            query=""
            path={secondaryPath}
          />
        )}
      </div>
    </div>
  );
}

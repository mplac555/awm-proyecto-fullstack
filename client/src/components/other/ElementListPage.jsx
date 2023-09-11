// IMPORTS: dependencies
import { useState } from "react";
import moment from "moment";
import ListManager from "../../modules/ListManager";
// IMPORTS: icon
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// IMPORTS: components
import DateTimeRangePicker from "./DateTimeRangePicker";
import Table from "./Table";
import axios from "axios";

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
  baseApiUrl,
  secondaryApiUrl,
  dateFilter,
  updateSecondary,
  secondaryDeleteHandler,
  readOnly,
}) {
  const [query, setQuery] = useState("");
  const [secondaryList, setSecondaryList] = useState([]);
  const [momentFiltering, setMomentFiltering] = useState(false);
  const [currentSelectedRow, setCurrentSelectedRow] = useState("");

  // Second list (2-table version) handler
  const setCurrent = async (current) => {
    // console.log("ListPage | SetCurrent | current", current);
    if (secondaryFields) {
      // console.log("ListPage | SetCurrent | current._id", current[0]?._id);
      setCurrentSelectedRow(current[0]?._id);
    }
    let secondList = [];
    try {
      if (current.length > 0) {
        const response = await axios.get(
          `${baseApiUrl}/${current[0]?._id}/${secondaryApiUrl}`
        );
        secondList = response.data;
      }
      // console.log("ListPage | SetCurrent | AxiosResponse", secondList);
      // current.forEach((x) => secondList.push(...x[secondaryFieldName]));
      // console.log("ListPage | SetCurrent | forEach", secondList);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      // console.log("ListPage | SetCurrent | finally | secondList", secondList);
      setSecondaryList(secondList);
      updateSecondary(secondList);
    }
  };

  // DateTime filtering (history version) handler
  function filterByDate(filtered, start, end) {
    setMomentFiltering(filtered && { start, end });
  }

  // console.log("ListPage | !currentSelection", !currentSelectedRow);

  function secondaryDelete(list, ids) {
    secondaryDeleteHandler(list, ids, currentSelectedRow);
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
          singleRowSelection={secondaryFields && true}
          readOnly={!!readOnly}
        />

        {/*OPTIONAL PRIMARY TABLE (disabled by default)*/}
        {secondaryFields && (
          <Table
            className="table"
            columns={secondaryFields}
            rows={secondaryList}
            // deleteRowHandler={ListManager.deleteElement}
            deleteRowHandler={secondaryDelete}
            name={secondaryName || "Elemento"}
            query=""
            // path={`${secondaryList[0]?._id}/${secondaryPath}`}
            path={`${currentSelectedRow}/${secondaryPath}`}
            secondaryDisabled={!currentSelectedRow}
          />
        )}
      </div>
    </div>
  );
}

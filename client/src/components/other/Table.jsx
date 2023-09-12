// IMPORTS: dependencies
import React, { useState, useMemo, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { genreOptions } from "../../data/BrigMembersData";
const moment = require("moment");
// IMPORTS: components
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// IMPORTS: icons
import {
  Edit,
  Delete,
  FilterList,
  PersonAdd,
  FindInPageOutlined,
} from "@mui/icons-material";
// IMPORTS: styles and lacale
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

// Ordering algorithm based on a comparator:
// If the 'orderBy' value of 'a' is lower than the 'orderBy'
// value of 'b', this function returns 1, which means the
// order between 'a' and 'b' is unaltered; otherwise, the
// function returns -1, which means the order between 'a'
// and 'b' is inverted.
function descendingComparator(a, b, orderBy) {
  // console.log("a:", a);
  // console.log("b:", b);
  // console.log(`a[${orderBy}]: ${a[orderBy]} - b[${orderBy}]: ${b[orderBy]}`);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Returns an ordering algorithm:
// depends on the value of 'order': 'ascending' or 'descending'
function getComparator(order, orderBy) {
  // console.log(`orden: ${order} - ordenarPor: ${orderBy}`);
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Toolbar that sits on top of the actual table:
// it contains auxiliary information related to the table,
// as well as some controls (buttons)
function TableToolbar({
  numSelected,
  deleteHandler,
  editHandler,
  detailsHandler,
  name,
  path,
  secondaryDisabled,
  readOnly,
  vehicleTable,
}) {
  // Buttons located at the far right of the toolbar:
  // these buttons are dynamically displayed, depending
  // on the number of currently selected rows, cycling
  // between the add, delete, edit and filter functionalities.
  let toolbarButtons;
  let deleteButton = (
    <Tooltip title="Borrar">
      <IconButton onClick={deleteHandler}>
        <Delete />
      </IconButton>
    </Tooltip>
  );
  let editButton = (
    <Tooltip title="Editar">
      <IconButton onClick={editHandler}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
  let filterButton = (
    <Tooltip title="Filtrar lista">
      <IconButton>
        <FilterList />
      </IconButton>
    </Tooltip>
  );
  let detailsButton = (
    <Tooltip title="Ver Detalles">
      <IconButton onClick={detailsHandler}>
        <FindInPageOutlined />
      </IconButton>
    </Tooltip>
  );
  if (numSelected > 1) {
    toolbarButtons = deleteButton;
  } else if (numSelected > 0) {
    toolbarButtons = (
      <>
        {readOnly ? detailsButton : editButton}
        {deleteButton}
      </>
    );
  } else {
    toolbarButtons = filterButton;
  }

  // console.log("Tabla | Toolbar | secondaryDisabled", secondaryDisabled);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        /*SELECTION COUNT (hidden by default)*/
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected > 1 ? "seleccionados" : "seleccionado"}
        </Typography>
      ) : (
        <>
          {/*TYPE OF ELEMENT HEADING*/}
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
            {name}s
          </Typography>
          {/*ADD ELEMENT BUTTON*/}
          {!(secondaryDisabled || readOnly) && (
            <Tooltip title={`Agregar Nuevo ${name}`}>
              <IconButton
                component={Link}
                to={path ? `${path}/agregar` : "agregar"}
              >
                {/* <PersonAdd /> */}
                {vehicleTable ? (
                  <img
                    src="https://img.icons8.com/?size=32&id=oIHGjapHKzm0&format=png"
                    alt="Icono de adicionar un carro"
                    style={{
                      filter:
                        "invert(47%) sepia(0%) saturate(0%) hue-rotate(193deg) brightness(97%) contrast(89%)",
                    }}
                  />
                ) : (
                  <PersonAdd />
                )}
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
      {/*OPTIONAL BUTTONS*/}
      {toolbarButtons}
    </Toolbar>
  );
}

// Table Header Component:
function Cabecera(props) {
  const {
    columns,
    onSelectAllClick,
    order,
    orderBy,
    selectedRowsCount,
    rowsCount,
    onRequestSort,
    singleRowSelection,
  } = props;

  // This function creates and returns another function, an ordering
  // function, specified by it's parent through props.
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {/*FIRST COLUMN: SELECT ALL*/}
        <TableCell className="check" padding="checkbox">
          {!singleRowSelection && (
            <Checkbox
              color="primary"
              indeterminate={
                selectedRowsCount > 0 && selectedRowsCount < rowsCount
              }
              checked={selectedRowsCount === rowsCount && rowsCount > 0}
              onChange={onSelectAllClick}
            />
          )}
        </TableCell>
        {/*REST OF COLUMNS*/}
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="center"
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// MAIN COMPONENT
export default function Tabla({
  columns,
  rows,
  deleteRowHandler,
  name,
  query,
  setCurrentSelection,
  dateFilter,
  path,
  singleRowSelection,
  secondaryDisabled,
  readOnly,
  vehicleTable,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  // console.log("Tabla | readOnly", readOnly);

  const navigate = useNavigate();

  // This function handles the deletion of a row, and
  // also calls the handler given by parent through props.
  function deleteElement() {
    deleteRowHandler(rows, selected);
    // deleteRowHandler(selected);
    forceUpdate();
    setSelected([]);
  }

  // This function redirects to the url corresponding
  // to the component that allows editing elements:
  function editElement() {
    navigate(path ? `${path}/editar/${selected[0]}` : `editar/${selected[0]}`);
  }

  function seeElementDetails() {
    navigate(
      path ? `${path}/detalles/${selected[0]}` : `detalles/${selected[0]}`
    );
  }

  // This function handles the sorting, each time it changes by clicking
  // on a Head Cell:
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This function handles the functionality of the select-all checkbox:
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      if (setCurrentSelection)
        setCurrentSelection(
          newSelected.map((id) => rows.find((f) => f._id === id))
        );
      return;
    }
    setSelected([]);
    if (setCurrentSelection) setCurrentSelection([]);
  };

  // This function keeps the list of selected elements updated at each instant;
  // it is executed each time a row is clicked:
  const handleRowClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (singleRowSelection) {
      newSelected = selectedIndex !== -1 ? [] : [id];
    } else {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    // console.log("Tabla | handleRowClick | newSelected", newSelected);

    setSelected(newSelected);
    // if (setCurrentSelection) setCurrentSelection(newSelected);
    if (setCurrentSelection)
      setCurrentSelection(
        newSelected.map((id) => rows.find((f) => f._id === id))
      );
  };

  // This function keeps the current page updated:
  const handleChangePage = (_, newPage) => setPage(newPage);

  // This functions handles the row count per page:
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  // This function checks if a row is selected, based on the
  // element's ID; it is used to keep visual feedback fresh and
  // updated at each time:
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // This variable determins the number of rows considered as empty,
  // depending on the current setting for the number of rows per page:
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // This function handles row ordering depending on the established
  // criteria; it also updated the list of rows that should be currently
  // shown, taking only 'n' rows corresponding to the current page,
  // where 'n' is the current setting for the number of rows per page;
  // the implementation of useMemo() keeps this function from beeing
  // executed each time the component is updated, but only when it's
  // strictly necessary; this helps saving resources and give a little
  // bit of extra agility to the table, beacause, otherwise, this
  // procedures would be executed each time a row is selected.
  // console.log(rows);
  const visibleRows = useMemo(() => {
    let list = [];

    // When the rows contain a "datetime" property, this part
    // of the function creates the "date" and "time" properties
    // to be able to show them in the table separately:
    if (rows[0] && rows[0].datetime) {
      rows.forEach((row) =>
        list.push({
          ...row,
          date: row.datetime.format("YYYY-MM-DD"),
          time: row.datetime.format("HH:mm:ss"),
        })
      );
    } else {
      list = [...rows];
    }

    // If the dateFilter is given through props, this filters
    // the rows that are inside this filter.
    if (dateFilter)
      list = list.filter((row) => {
        // return row.datetime?.isBetween(dateFilter.start, dateFilter.end);
        let datetime = moment(
          `${row.alertaDate} ${row.alertaHour}`,
          "YYYY-MM-DD HH:mm:ss"
        );
        return datetime.isBetween(dateFilter.start, dateFilter.end);
      });

    // This part filters the rows depending on the query generated
    // in the searchbar (external component) and sent through props;
    // it also takes the correct number of rows to show per page.
    return list
      .filter((row) =>
        columns
          .map((col) =>
            String(row[col.id]).toLowerCase().includes(query.toLowerCase())
          )
          .includes(true)
      )
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      .sort(getComparator(order, orderBy));
  }, [order, orderBy, page, rowsPerPage, ignored, query, rows, dateFilter]);

  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/*THE TOP TOOLBAR COMPONENT*/}
        <TableToolbar
          numSelected={selected.length}
          deleteHandler={deleteElement}
          editHandler={editElement}
          detailsHandler={seeElementDetails}
          name={name}
          path={path}
          secondaryDisabled={secondaryDisabled}
          readOnly={readOnly}
          vehicleTable={!!vehicleTable}
        />
        <TableContainer>
          {/*ACTUAL TABLE*/}
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            {/*TABLE HEADER*/}
            <Cabecera
              columns={columns}
              selectedRowsCount={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowsCount={rows.length}
              singleRowSelection={singleRowSelection}
            />
            {/*TABLE BODY*/}
            <TableBody>
              {/* FILLED ROWS */}
              {visibleRows.map((row) => {
                const isRowSelected = isSelected(row._id);
                return (
                  <TableRow
                    key={row._id}
                    hover
                    onClick={() => handleRowClick(row._id)}
                    role="checkbox"
                    tabIndex={-1}
                    selected={isRowSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isRowSelected} />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {column.id === "genre"
                          ? genreOptions[row.genre]
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {/* EMPTY ROWS */}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <ThemeProvider theme={createTheme(esES)}>
          {/*TABLE FOOTER*/}
          <TablePagination
            className="table-footer"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ThemeProvider>
      </Paper>
    </Box>
  );
}

function add(list, newElement) {
  newElement.id = list.length + 1;
  list.push(newElement);
}

function searchElementById(list, id) {
  return list.find((element) => element.id === parseInt(id));
}

function deleteElement(list, ids) {
  ids.forEach((id) => {
    list.splice(
      list.findIndex((element) => element.id === id),
      1
    );
  });
}

function editElement(list, modifiedElement) {
  list[list.findIndex((element) => element.id === modifiedElement.id)] =
    modifiedElement;
}

export default {
  add,
  searchElementById,
  deleteElement,
  editElement,
};

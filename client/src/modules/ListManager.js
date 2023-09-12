import axios from "axios";

function add(list, newElement) {
  list.push(newElement);
}

function searchElementById(list, id) {
  return list.find((element) => element.id === parseInt(id));
}

function deleteElement(list, ids, url) {
  try {
    ids.forEach((id) => {
      axios
        .delete(`${url}/${id}`, {
          headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
        })
        .catch(console.log);
      list.splice(
        list.findIndex((element) => element._id === id),
        1
      );
    });
  } catch (error) {
    console.log(error);
  }
}

function editElement(list, modifiedElement) {
  list[list.findIndex((element) => element._id === modifiedElement._id)] =
    modifiedElement;
}

export default {
  add,
  searchElementById,
  deleteElement,
  editElement,
};

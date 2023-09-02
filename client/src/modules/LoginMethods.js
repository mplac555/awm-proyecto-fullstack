//Login brigade

function loginBrigade(list,vbrigade){
    const {vname, vemail, vpassword} = vbrigade;

    return list.find((brigadista) => {
      return(
        brigadista.name == vname && brigadista.email == vemail
        && brigadista.password == vpassword
      );
    });

  }

  //Find brigade by Name
  function searchElementByName(list, name) {
    return list.find((element) => element.name === name);
  }
  export default {

    loginBrigade,
    searchElementByName
  };
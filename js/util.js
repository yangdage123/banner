function handleName(name) {
  let classReg = /^\..+/;
  let idReg = /^#.+/;
  if (classReg.test(name)) {
    return 'class'
  } else if (idReg.test(name)) {
    return 'id';
  }
  return false;
}

function $(name) {
  if (document.querySelectorAll) {
    let result = document.querySelectorAll(name);
    return result.length === 1 ? result[0] : result;
  } else {
    let id = handleName(name);
    if (id) {
      if (id === 'id') {
        return document.getElementById(name.replace(/^#/, ''));
      } else {
        let result =  document.getElementsByClassName(name.replace(/^\./, ''));
        return result.length === 1 ? result[0] : result;
      }
    } else {
      throw new Error(`不能$(${name})`);
    }
  }
}

const util = {
  $,
};

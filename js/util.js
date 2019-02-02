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

function domList2List(domList) {
  return Array.prototype.slice(domList);
}

function y(name) {
  if (document.querySelectorAll) {
    let result = document.querySelectorAll(name);
    return result.length === 1 ? result[0] : domList2List(result);
  } else {
    let id = handleName(name);
    if (id) {
      if (id === 'id') {
        return document.getElementById(name.replace(/^#/, ''));
      } else {
        let result =  document.getElementsByClassName(name.replace(/^\./, ''));
        return result.length === 1 ? result[0] : domList2List(result);
      }
    } else {
      throw new Error(`不能$(${name})`);
    }
  }
}

function removeClass(name, className) {
  function remove(e) {
    e.className = e.className.replace(className, '');
  }
  let el = y(name);
  if (el) {
    if (Array.isArray(el)) {
      for (let i = 0; i < el.length; i++) {
        remove(el[i]);
      }
    } else {
      remove(el);
    }
  }
}
//
// export default {
//   $,
//   removeClass,
// };

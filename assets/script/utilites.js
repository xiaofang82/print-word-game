function onEvent(event, selector, callback){
  return selector.addEventListener(event,callback);
}

function select(selector,parent = document){
  return parent.querySelector(selector);
}

function selectById(selector,parent = document){
  return parent.getElementById(selector);
}

function selectAll(selector,parent = document){
  return [...parent.querySelectorAll(selector)];
}

function create(element,parent=document){
  return parent.createElement(element);
}

export {onEvent, select, selectAll, selectById, create};
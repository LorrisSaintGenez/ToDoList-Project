export const getBoardItems = boardID => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/itemBoards?filter[where][boardId]=" + boardID, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

export const addBoardItem = itemInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/itemBoards", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(itemInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const deleteBoardItem = id => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/api/itemBoards/" + id, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const updateBoardItem = (id, taskInformations) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", "http://localhost:3000/api/itemBoards/" + id, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(taskInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};
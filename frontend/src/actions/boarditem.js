const serverUrl = "http://localhost:3000";

export const getBoardItems = boardID => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/itemBoards?filter[where][boardId]=" + boardID, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

export const getBoardCompletedItems = boardID => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/itemBoards?filter[where][boardId]=" + boardID
					+ "&filter[where][isDone]=true", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

export const addBoardItem = itemInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", serverUrl + "/api/itemBoards", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(itemInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const deleteBoardItem = id => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", serverUrl + "/api/itemBoards/" + id, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const updateBoardItem = (id, taskInformations) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", serverUrl + "/api/itemBoards/" + id, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(taskInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getTaskAuthor = taskid => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/itemBoards/getTaskOwner?taskid=" + taskid, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};
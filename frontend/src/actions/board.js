const serverUrl = "http://localhost:3000";

export const addBoard = boardInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", serverUrl + "/api/boards/createNewBoard", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(boardInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getBoardByOwnerId = userid => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/boards/getBoardByOwnerId?userid=" + userid, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const getBoardSharedWithUser = username => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/boards/getBoardSharedWithUser?username=" + username, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const getBoard = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const deleteBoard = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", serverUrl + "/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const editBoard = (boardInformation, boardId) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", serverUrl + "/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(boardInformation));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getBoardOwner = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/boards/getBoardOwner?boardid=" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const getBoardWithToken = token => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/boards/getBoardWithToken?token=" + token, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

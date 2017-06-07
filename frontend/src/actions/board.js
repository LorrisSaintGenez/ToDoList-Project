export const addBoard = boardInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/boards/createNewBoard", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(boardInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getBoardByOwnerId = (userid, cb) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/getBoardByOwnerId?userid=" + userid, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = () => {
    if (xhttp.readyState === 4) {
      cb(JSON.parse(xhttp.responseText));
    }
    else {
      cb(null);
    }
  };
  xhttp.send();
};

export const getBoardSharedWithUser = username => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/getBoardSharedWithUser?username=" + username, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const getBoard = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const deleteBoard = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const editBoard = (boardInformation, boardId) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", "http://localhost:3000/api/boards/" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(boardInformation));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getBoardOwner = boardId => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/getBoardOwner?boardid=" + boardId, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};

export const getBoardWithToken = token => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/getBoardWithToken?token=" + token, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};
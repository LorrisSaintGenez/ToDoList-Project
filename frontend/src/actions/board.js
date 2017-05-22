export const addBoard = boardInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/boards/createNewBoard", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(boardInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const getBoardByOwnerId = userid => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/boards/getBoardByOwnerId?userid=" + userid, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.responseText;
};
export const addConnection = signupInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/Users", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signupInformations));
};
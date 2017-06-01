export const addConnection = signupInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/todoUsers", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signupInformations));
  return xhttp.responseText;
};

export const loginConnection = signinInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/todoUsers/login", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signinInformations));
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

export const getUserByUsername = username => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/api/todoUsers/getUserByUsername?username=" + username, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4
};
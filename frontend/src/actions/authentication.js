const serverUrl = "http://localhost:3000";

export const addConnection = signupInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", serverUrl + "/api/todoUsers", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signupInformations));
  return xhttp.responseText;
};

export const loginConnection = signinInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", serverUrl + "/api/todoUsers/login", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signinInformations));
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};

export const getUserByUsername = username => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/todoUsers/getUserByUsername?username=" + username, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4
};

export const getUserById = (id, access_token) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", serverUrl + "/api/todoUsers/" + id + "?access_token=" + access_token, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};
